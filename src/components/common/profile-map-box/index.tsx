"use client";
import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { cn } from "@/lib";
import FavIcon from "@/icon/admin/favIcon";

interface Location {
  lat: string | number;
  long: string | number;
  location: string;
}

interface ProfileMapboxProps {
  locations?: Location[];
  className?: string;
}

const ProfileMapbox: React.FC<ProfileMapboxProps> = ({
  locations = [],
  className,
}) => {


  return (
    <div className={cn("w-full h-[300px] md:h-full", className)}>
      {locations?.length > 0 ? (
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        >
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{
              lat: Number(locations[0].lat),
              lng: Number(locations[0].long),
            }}
            defaultZoom={12}
          >
            {locations?.map((loc, index) => (
              <Marker
                key={index}
                position={{
                  lat: Number(loc.lat),
                  lng: Number(loc.long),
                }}
                title={loc.location}
              />
            ))}
          </Map>
        </APIProvider>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <FavIcon
            name="navlocation"
            color="#888"
            className="mx-auto size-20"
          />
          <h1 className="text-center text-gray1 font-semibold">
            Location is not Available
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProfileMapbox;
