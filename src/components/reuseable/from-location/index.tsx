"use client";
import { Plus} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Controller,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState, useCallback} from "react";


const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

async function fetchGooglePlaces(value: string) {
  if (value?.length > 0) {
    const res = await fetch(`/api/google-place?query=${value}`);
    const data = await res.json();
    return data?.results;
  }
}

interface FormInputProps {
  stylelabel?: string;
  name?: string;
  label?: string;
  className?: string;
}

export default function FromLocation({
  name = "locations",
  label,
  stylelabel,
  className,
}: FormInputProps) {
  // 1. Import `watch` to monitor form state changes
  const { control, setValue, watch } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name,
  });

  // 2. Watch the entire 'locations' array for changes
  const watchedLocations = watch(name);

  // 3. Find if a head office is already selected and get its index
  const headOfficeIndex = watchedLocations?.findIndex(
    (loc: any) => loc?.type === "head-office"
  );

  const [suggestions, setSuggestions] = useState<{ [key: number]: any[] }>({});

  const handleSearch = useCallback((query: string, index: number) => {
    const debouncedSearch = debounce(async (searchQuery: string, searchIndex: number) => {
      if (searchQuery) {
        const results = await fetchGooglePlaces(searchQuery);
        setSuggestions(prev => ({ ...prev, [searchIndex]: results }));
      } else {
        setSuggestions(prev => ({ ...prev, [searchIndex]: [] }));
      }
    }, 500);
    
    debouncedSearch(query, index);
  }, []);

  const handleSelectSuggestion = (suggestion: any, index: number) => {
    setValue(`${name}.${index}.location`, suggestion.formatted_address, { shouldValidate: true });
    setValue(`${name}.${index}.lat`, suggestion.geometry.location.lat);
    setValue(`${name}.${index}.long`, suggestion.geometry.location.lng);
    setSuggestions(prev => ({ ...prev, [index]: [] }));
  };

  const handleAddLocation = () => {
    append({ location: "", type: "branch", lat: "", long: "" });
  };

  return (
    <div className={cn("relative border rounded-3xl p-3", className)}>
      <Label
        className={cn(
          "text-blacks text-base font-medium absolute -top-3 left-7 bg-body px-3",
          stylelabel
        )}
      >
        {label ?? "Locations"}
      </Label>

      <div className="mt-2 space-y-3">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start gap-2">
            <div className="relative w-full">
              <Controller
                name={`${name}.${index}.location`}
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      placeholder={`Location ${index + 1}`}
                      className="flex-1 rounded-full"
                      value={field.value ?? "55"}
                      onChange={(e) => {
                        field.onChange(e);
                        handleSearch(e.target.value, index);
                      }}
                      autoComplete="off"
                    />
                    {suggestions[index] && suggestions[index].length > 0 && (
                      <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {suggestions[index].map((sug) => (
                          <li
                            key={sug.place_id}
                            className="p-3 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectSuggestion(sug, index)}
                          >
                            {sug.formatted_address}
                          </li>
                        ))}
                      </ul>
                    )}
                    {error && <p className="text-sm text-red-500 mt-1 ml-3">{error.message}</p>}
                  </>
                )}
              />
            </div>

            <Controller
              name={`${name}.${index}.type`}
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full sm:w-[180px] rounded-full ring-0 shadow-none">
                    <SelectValue placeholder="Office type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branch">Branch</SelectItem>
                    {/* 4. Conditionally disable the "Head Office" option */}
                    <SelectItem
                      value="head-office"
                      disabled={headOfficeIndex !== -1 && headOfficeIndex !== index}
                    >
                      Head Office
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="primary"
        className="rounded-full h-8 mt-4"
        onClick={handleAddLocation}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add more
      </Button>
    </div>
  );
}