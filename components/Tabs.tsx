import Button from "@/components/Button";
import {Tab, TabItem} from "@/src/types/tabs";


type TabsProps = {
    tabs: TabItem[];
    activeTab: Tab;
    setActiveTab: (title: Tab) => void;
}

export const Tabs = ({tabs, activeTab, setActiveTab}: TabsProps) => {
    return (
        <div className="flex justify-center gap-4 w-full">
            {tabs.map((tab) => (
                <Button
                    key={tab.title}
                    type="button"
                    onClick={() => {
                        setActiveTab(tab.title);
                    }}
                    className={activeTab === tab.title ? "bg-green-700 hover:bg-green-600 scale-105 transition-all duration-300" : "bg-gray-800 hover:bg-gray-700 transition-all duration-300"}>{tab.title}</Button>
            ))}
        </div>

    )
}