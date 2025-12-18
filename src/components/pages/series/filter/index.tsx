"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { ChevronDown, Funnel, SearchIcon, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategoriesAction } from "@/server-actions/series";

const statusOptions: Option[] = [
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
];

const novelTypeOptions: Option[] = [
  { label: "Novel", value: "novel" },
  { label: "Manga", value: "manga" },
  { label: "Manhwa", value: "manhwa" },
];

export default function SeriesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Current filter selections (local state, not applied yet)
  const [status, setStatus] = useState<Option[]>([]);
  const [novelType, setNovelType] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [search, setSearch] = useState("");

  // Applied filters (from URL, what's currently active)
  const [appliedStatus, setAppliedStatus] = useState<Option[]>([]);
  const [appliedNovelType, setAppliedNovelType] = useState<Option[]>([]);
  const [appliedCategories, setAppliedCategories] = useState<Option[]>([]);
  const [appliedSearch, setAppliedSearch] = useState("");

  const [isInitialized, setIsInitialized] = useState(false);

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategoriesAction();
      if (result.success && result.data) {
        setCategoryOptions(
          result.data.map((cat) => ({ label: cat, value: cat }))
        );
      }
    };
    loadCategories();
  }, []);

  // Initialize filters from URL params (only once)
  useEffect(() => {
    if (isInitialized || categoryOptions.length === 0) return;

    const statusParam = searchParams.get("status");
    const novelTypeParam = searchParams.get("novelType");
    const categoriesParam = searchParams.get("categories");
    const searchParam = searchParams.get("search");

    let initialStatus: Option[] = [];
    let initialNovelType: Option[] = [];
    let initialCategories: Option[] = [];
    let initialSearch = "";

    if (statusParam) {
      const statusValues = statusParam.split(",");
      initialStatus = statusOptions.filter((opt) =>
        statusValues.includes(opt.value)
      );
    }

    if (novelTypeParam) {
      const typeValues = novelTypeParam.split(",");
      initialNovelType = novelTypeOptions.filter((opt) =>
        typeValues.includes(opt.value)
      );
    }

    if (categoriesParam) {
      const categoryValues = categoriesParam.split(",");
      initialCategories = categoryOptions.filter((opt) =>
        categoryValues.includes(opt.value)
      );
    }

    if (searchParam) {
      initialSearch = searchParam;
    }

    // Set both current and applied filters to match URL
    setStatus(initialStatus);
    setAppliedStatus(initialStatus);
    setNovelType(initialNovelType);
    setAppliedNovelType(initialNovelType);
    setCategories(initialCategories);
    setAppliedCategories(initialCategories);
    setSearch(initialSearch);
    setAppliedSearch(initialSearch);

    setIsInitialized(true);
  }, [searchParams, categoryOptions, isInitialized]);

  // Check if filters have changed from applied filters
  const hasUnsavedChanges = () => {
    const statusStr = status
      .map((s) => s.value)
      .sort()
      .join(",");
    const appliedStatusStr = appliedStatus
      .map((s) => s.value)
      .sort()
      .join(",");

    const novelTypeStr = novelType
      .map((t) => t.value)
      .sort()
      .join(",");
    const appliedNovelTypeStr = appliedNovelType
      .map((t) => t.value)
      .sort()
      .join(",");

    const categoriesStr = categories
      .map((c) => c.value)
      .sort()
      .join(",");
    const appliedCategoriesStr = appliedCategories
      .map((c) => c.value)
      .sort()
      .join(",");

    const searchStr = search.trim();

    return (
      statusStr !== appliedStatusStr ||
      novelTypeStr !== appliedNovelTypeStr ||
      categoriesStr !== appliedCategoriesStr ||
      searchStr !== appliedSearch
    );
  };

  // Apply filters button handler
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Update status
    if (status.length > 0) {
      params.set("status", status.map((s) => s.value).join(","));
    } else {
      params.delete("status");
    }

    // Update novelType
    if (novelType.length > 0) {
      params.set("novelType", novelType.map((t) => t.value).join(","));
    } else {
      params.delete("novelType");
    }

    // Update categories
    if (categories.length > 0) {
      params.set("categories", categories.map((c) => c.value).join(","));
    } else {
      params.delete("categories");
    }

    // Update search
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    // Reset to page 1 when filters change
    params.set("page", "1");

    // Update applied filters
    setAppliedStatus(status);
    setAppliedNovelType(novelType);
    setAppliedCategories(categories);
    setAppliedSearch(search.trim());

    router.push(`/series?${params.toString()}`, { scroll: false });
  };

  const activeFiltersCount =
    appliedStatus.length +
    appliedNovelType.length +
    appliedCategories.length +
    (appliedSearch ? 1 : 0);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 ml-auto px-4 py-2 rounded-lg font-medium transition-all ${
            isOpen
              ? "bg-linear-to-r from-secondary/80 to-secondary text-white shadow-lg shadow-primary/20"
              : "bg-slate-100 text-[#333] hover:bg-slate-200"
          }`}
        >
          <Funnel className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-accent text-[#333] rounded-full">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 ml-auto transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out origin-top ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="pt-6 ">
            <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Status */}
              <div className="space-y-2">
                <Label className="font-semibold text-gray-300">Status</Label>
                <MultiSelect
                  options={statusOptions}
                  selected={status}
                  onChange={setStatus}
                  placeholder="Select status"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label className="font-semibold text-gray-300">Type</Label>
                <MultiSelect
                  options={novelTypeOptions}
                  selected={novelType}
                  onChange={setNovelType}
                  placeholder="Select type"
                />
              </div>

              {/* Genre */}
              <div className="space-y-2">
                <Label className="font-semibold text-gray-300">Genre</Label>
                <MultiSelect
                  options={categoryOptions}
                  selected={categories}
                  onChange={setCategories}
                  placeholder="Select genre"
                />
              </div>
            </div>

            <div className="w-full max-w-md space-y-2 mt-5">
              <Label htmlFor={"search"}>Search</Label>
              <div className="relative">
                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                  <SearchIcon className="size-4" />
                  <span className="sr-only">Search</span>
                </div>
                <Input
                  id="search"
                  type="search"
                  placeholder="What do you find interesting?..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="peer px-9 border-none bg-[#27272A] border-gray-200 focus-visible:ring-2 ring-secondary"
                />
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="mt-6 flex items-center gap-3">
              <Button
                onClick={handleApplyFilters}
                disabled={!hasUnsavedChanges()}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                Apply Filters
              </Button>
              {hasUnsavedChanges() && (
                <span className="text-sm text-muted-foreground">
                  You have unsaved filter changes
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
