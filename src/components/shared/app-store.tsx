import React from 'react';
import googlePlay from "@/assets/googleplay.png";
import appStore from "@/assets/appstore.png";
import { cn } from '@/lib/utils';
import { ImgBox } from '../common/admin/reuseable';

// Define the types for the props
interface AppStoreProps {
    className?: string; // Optional string for className
    titleStyle?: string; // Optional string for titleStyle
}

const AppStore = ({ className, titleStyle }: AppStoreProps) => {
    return (
        <div className={className}>
            <h3 className={cn("font-semibold text-lg mb-2", titleStyle)}>
                Download our app from
            </h3>
            <div className="flex flex-col gap-3 items-start">
                <a href="https://play.google.com/store/games?hl=en&pli=1" target="_blank">
                    <ImgBox src={googlePlay} alt="googlePlay" className="w-45 h-13 lg:w-45 lg:h-13" /></a>
                <a href="https://www.apple.com/app-store/" target="_blank">
                    <ImgBox src={appStore} alt="appStore" className="w-45 h-13 lg:w-45 lg:h-13" /></a>

            </div>
        </div>
    );
};

export default AppStore;
