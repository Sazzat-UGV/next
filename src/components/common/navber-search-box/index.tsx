import Modal from "@/components/reuseable/modal";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib";
import { useGetCitiesQuery, useGetStatesQuery } from "@/redux/api/commonApi";
import { useCategoriesQuery } from "@/redux/api/landing/videosApi";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const intValue = {
  title: "",
  service: "",
  state: "",
  city: "",
};

export default function NavberSearchBox({ className }: any) {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);
  const [isLocation, setIsLocation] = useState(false);
  const [isValue, setIsValue] = useState(intValue);
  const [isSelect, setIsSelect] = useState({
    state: [] as { label: string; value: string }[],
    city: [] as { label: string; value: string }[],
    service: [] as { label: string; value: string }[],
  });

  // Fetch states only when location modal is open
  const { data: categories } = useCategoriesQuery({ per_page: 1000 });
  const { data: states } = useGetStatesQuery(
    {},
    { skip: !(isLocation || isShow) }
  );
  const { data: citys } = useGetCitiesQuery(isValue.state, {
    skip: !isValue.state,
  });

  // Handle input change
  const handleChange = (name: keyof typeof intValue, value: string) => {
    setIsValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Populate states select
  useEffect(() => {
    if (!states?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      state: states.map(({ name, id }: any) => ({
        label: name,
        value: id?.toString(),
      })),
    }));
  }, [states]);

  // Populate cities select
  useEffect(() => {
    if (!citys?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      city: citys.map(({ name, id }: any) => ({
        label: name,
        value: id?.toString(),
      })),
    }));
  }, [citys]);

  // service
  useEffect(() => {
    if (!categories?.data?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      service: categories?.data?.map(({ name, id }: any) => ({
        label: name,
        value: id?.toString(),
      })),
    }));
  }, [categories]);

  // Selected state & city name
  const state_name =
    states?.find((s: any) => String(s.id) === isValue.state)?.name || "";
  const city_name =
    citys?.find((c: any) => String(c.id) === isValue.city)?.name || "";

  //  handleSearch
  const handleSearch = () => {
    const value = {
      search: isValue.title,
      state: state_name,
      city: city_name,
      service: isValue.service,
    };

    const res = Object.fromEntries(
      Object.entries(value).filter(([_, v]) => v?.length)
    );

    const params = new URLSearchParams(res);
    router.push(`/videos/global?${params.toString()}`);
    setTimeout(() => setIsValue(intValue), 1000);
  };

  // Better modal control: use classList API and handle SSR safety
  const handleOpen = () => {
    setIsShow(true);
    if (typeof document !== "undefined") {
      document.body.classList.add("overflow-hidden");
    }
  };

  const handleColse = () => {
    setIsShow(false);
    if (typeof document !== "undefined") {
      document.body.classList.remove("overflow-hidden");
    }
  };

  return (
    <div>
      <div className="hidden md:block">
        <div className="rounded-full bg-white px-2 shadow w-fit mx-4 xl:mx-auto flex items-center">
          <div className={cn("flex justify-between items-center", className)}>
            {/* Service Input */}
            <input
              type="text"
              placeholder="Title"
              className="w-full h-full px-4 bg-transparent outline-none text-[#767676] placeholder:text-[#767676] text-base"
              aria-label="Service search input"
              value={isValue.title}
              onChange={(e: any) => handleChange("title", e.target.value)}
            />

            <div className="w-full">
              <Select
                onValueChange={(value) => handleChange("service", value)}
                value={isValue.service}
              >
                <SelectTrigger className="!w-full  cursor-pointer py-0 my-0 border-l !h-5 border-[#A0A0A0]  border-r-0 border-y-0 rounded-none shadow-none">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {isSelect.service.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Location Input (click to open modal) */}
            <input
              type="text"
              placeholder="Location"
              readOnly
              className={`w-full h-5 text-base px-4 bg-transparent outline-none text-[#767676] placeholder:text-[#767676]  border-l border-[#A0A0A0] cursor-pointer`}
              aria-label="Location search input"
              value={
                isValue?.state
                  ? `${state_name}${city_name ? `, ${city_name}` : ""}`
                  : "Location"
              }
              onClick={(e) => {
                e.stopPropagation();
                setIsLocation(true);
              }}
            />
          </div>
          <Button
            variant="primary"
            className="w-[100px] px-0 h-11 my-1 rounded-full has-[>svg]:px-0"
            onClick={() => handleSearch()}
          >
            <Search className="w-5 h-5" />
            Search
          </Button>
        </div>

        {/* Location Modal */}
        <Modal open={isLocation} setIsOpen={setIsLocation} title="Location">
          <div className="text-center">
            <FavIcon name="navlocation" className="mx-auto size-20" />
            <div className="py-3">
              <h1 className="text-2xl font-bold text-blacks">
                Choose location
              </h1>
              <h1 className="text-base max-w-xs text-center mx-auto">
                For show related videos depended on location
              </h1>
            </div>

            {/* State Dropdown */}
            <Select
              onValueChange={(value) => handleChange("state", value)}
              value={isValue.state}
            >
              <SelectTrigger className="w-full cursor-pointer rounded-full py-[20px] shadow-none">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {isSelect.state.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* City Dropdown */}
            <Select
              onValueChange={(value) => {
                handleChange("city", value);
              }}
              value={isValue.city}
              disabled={!isValue.state}
            >
              <SelectTrigger className="w-full rounded-full cursor-pointer py-[20px] shadow-none mt-3">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {isSelect.city.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-2 space-x-5">
              <Button
                size="lg"
                variant="primary"
                className="rounded-full bg-[#F0F0F0] text-blacks px-10"
                onClick={() => {
                  setIsValue(intValue); // reset service, state, city
                  setIsSelect((prev) => ({
                    ...prev,
                    city: [], // also clear cities when state is cleared
                  }));
                }}
              >
                Clear
              </Button>
              <Button
                size="lg"
                variant="primary"
                className="rounded-full px-10"
                onClick={() => setIsLocation(false)}
              >
                Go
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      {/* small device icon */}
      <div className="block md:hidden">
        <h1
          onClick={() => handleOpen()}
          className="size-12 bg-reds/80  rounded-full cursor-pointer grid place-items-center"
        >
          <Search className="text-white size-5" />
        </h1>
        {isShow && (
          <div className="fixed inset-0 z-30 bg-white">
            <div
              onClick={() => handleColse()}
              className="fixed z-35 right-5 top-5"
            >
              <span className="size-10 cursor-pointer  text-black">
                <X />
              </span>
            </div>
            <div className="flex flex-col justify-center items-center min-h-screen">
              <div className="w-full max-w-md bg-white rounded-2xl p-2 mx-4">
                <h2 className="text-xl font-semibold text-center mb-4 text-blacks">
                  Search Videos
                </h2>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full mb-3 px-4 py-2 h-10 rounded-full border border-gray-200 outline-none text-base text-[#767676] placeholder:text-[#767676]"
                  aria-label="Service search input"
                  value={isValue.title}
                  onChange={(e: any) => handleChange("title", e.target.value)}
                />
                <Select
                  onValueChange={(value) => handleChange("service", value)}
                  value={isValue.service}
                >
                  <SelectTrigger className="w-full mb-3 !h-10 rounded-full border border-gray-200">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {isSelect.service.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* state */}
                <Select
                  onValueChange={(value) => handleChange("state", value)}
                  value={isValue.state}
                >
                  <SelectTrigger className="w-full cursor-pointer rounded-full !h-10 shadow-none">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {isSelect.state.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* City Dropdown */}
                <Select
                  onValueChange={(value) => {
                    handleChange("city", value);
                  }}
                  value={isValue.city}
                  disabled={!isValue.state}
                >
                  <SelectTrigger className="w-full rounded-full cursor-pointer !h-10 shadow-none mt-3">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {isSelect.city.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="flex justify-between mt-2">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full bg-[#F0F0F0] hover:bg-[#F0F0F0] text-blacks px-8"
                    onClick={() => {
                      setIsValue(intValue);
                      setIsSelect((prev) => ({
                        ...prev,
                        city: [],
                      }));
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    size="lg"
                    variant="primary"
                    className="rounded-full px-8"
                    onClick={() => {
                      handleSearch();
                      // overflow remove
                      setTimeout(() => {
                        if (typeof document !== "undefined") {
                          document.body.classList.remove("overflow-hidden");
                        }
                      }, 3000);
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
