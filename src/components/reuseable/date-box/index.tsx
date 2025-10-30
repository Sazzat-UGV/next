"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function MonthlyBox({ setIsMonth }: any) {
  // Declare months array and helper function first
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function getDisplayMonth(v: number) {
    return months[(v + 12) % 12];
  }

  const [selectedRange, setSelectedRange] = React.useState<
    "monthly" | "yearly" | "custom"
  >("monthly");
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  );

  const monthValue = getDisplayMonth(selectedMonth);

  React.useEffect(() => {
    setIsMonth((prev: any) => ({
      ...prev,
      type: selectedRange?.toString(),
      month: monthValue?.toString(),
      year: selectedYear,
    }));
  }, [monthValue, selectedYear, setIsMonth, selectedRange]);

  const cardRef = React.useRef<HTMLDivElement>(null);
  const yearsInGrid = 12; // Number of years to display in the grid

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectedRange === "custom" &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        setSelectedRange("monthly"); // Close custom popup on outside click
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedRange]);

  const handleYearNavigation = (
    direction: "prev" | "next",
    tab: "month" | "year"
  ) => {
    if (tab === "month") {
      setCurrentYear((prevYear) =>
        direction === "prev" ? prevYear - 1 : prevYear + 1
      );
    } else if (tab === "year") {
      setCurrentYear((prevYear) =>
        direction === "prev" ? prevYear - yearsInGrid : prevYear + yearsInGrid
      );
    }
  };

  // Generate years for the grid, starting from currentYear backwards
  const getYearsForGrid = () => {
    const years = [];
    for (let i = 0; i < yearsInGrid; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  return (
    <div className="flex flex-col items-start relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent border hidden md:block text-blacks rounded-full py-1 h-8 w-[100px] lg:flex space-x-2">
            {selectedRange.charAt(0).toUpperCase() + selectedRange.slice(1)}{" "}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[150px] mr-10 border-0">
          <DropdownMenuItem
            onClick={() => {
              setSelectedRange("monthly");
              setSelectedMonth(new Date().getMonth()); // reset to current month
              setSelectedYear(new Date().getFullYear()); // reset to current year
            }}
          >
            Monthly
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSelectedRange("yearly");
              setSelectedMonth(new Date().getMonth()); // optionally reset month as well
              setSelectedYear(new Date().getFullYear()); // reset to current year
            }}
          >
            Yearly
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedRange("custom")}>
            Custom
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedRange === "custom" && (
        <Card
          ref={cardRef}
          className="mt-9 p-0 gap-0  min-w-xl rounded-xl border-0 shadow-md absolute top-0 right-0 bg-white z-50"
        >
          <Tabs defaultValue="month" className="w-full gap-0">
            <TabsList className="grid w-full grid-cols-2 !rounded-tl-xl !rounded-tr-xl rounded-none  h-11 p-0   bg-[#F0F0F0]">
              <TabsTrigger
                value="month"
                className="data-[state=active]:bg-reds data-[state=active]:data-[state=active]:rounded-tl-xl data-[state=active]:text-white h-full data-[state=active]:shadow-sm rounded-none px-4 py-1 cursor-pointer"
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                value="year"
                className="data-[state=active]:bg-reds data-[state=active]:data-[state=active]:rounded-tr-xl  h-full data-[state=active]:text-white data-[state=active]:shadow-sm rounded-none px-4 py-1 cursor-pointer"
              >
                Year
              </TabsTrigger>
            </TabsList>
            <TabsContent value="month" className="mt-4 p-3">
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#FFDDDD] hover:bg-[#FFDDDD]"
                  onClick={() => handleYearNavigation("prev", "month")}
                  aria-label="Previous year"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-semibold">{currentYear}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#FFDDDD] hover:bg-[#FFDDDD]"
                  onClick={() => handleYearNavigation("next", "month")}
                  aria-label="Next year"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {months.map((month, index) => (
                  <Button
                    key={month}
                    variant={selectedMonth === index ? "default" : "outline"}
                    className={
                      selectedMonth === index
                        ? "bg-reds hover:bg-reds text-white rounded-full"
                        : "bg-transparent hover:bg-transparent rounded-full"
                    }
                    onClick={() => setSelectedMonth(index)}
                  >
                    {month}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="year" className="mt-4 p-3">
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#FFDDDD] hover:bg-[#FFDDDD]"
                  onClick={() => handleYearNavigation("prev", "year")}
                  aria-label="Previous block of years"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-semibold">{currentYear}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#FFDDDD] hover:bg-[#FFDDDD]"
                  onClick={() => handleYearNavigation("next", "year")}
                  aria-label="Next block of years"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {getYearsForGrid().map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    className={
                      selectedYear === year
                        ? "bg-reds hover:bg-reds text-white rounded-full"
                        : "bg-transparent hover:bg-transparent rounded-full"
                    }
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
}
