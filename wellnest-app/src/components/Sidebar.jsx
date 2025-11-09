import React from 'react';
import { RiMentalHealthLine } from 'react-icons/ri';
import { LuTimer } from 'react-icons/lu';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { TbCheckbox } from 'react-icons/tb';
import { PiLeafLight } from 'react-icons/pi';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const topTabs = [
    { id: 'zen', label: 'zen', icon: RiMentalHealthLine },
    { id: 'timer', label: 'timer', icon: LuTimer },
  ];

  const bottomTabs = [
    { id: 'chatbot', label: 'chatbot', icon: HiOutlineChatBubbleLeftRight },
    { id: 'todo', label: 'to do', icon: TbCheckbox },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-4 flex flex-col items-center">
        {/* Top Navigation Tabs */}
        <nav>
          <ul className="space-y-3">
            {topTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-16 h-20 flex flex-col items-center justify-center gap-1 rounded-[2rem] transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    title={tab.label}
                  >
                    <Icon className="text-xl" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logo/Brand - Middle */}
        <div className="my-4 flex items-center justify-center w-16 h-16 bg-gray-200 rounded-[2rem]">
          <PiLeafLight className="text-3xl text-gray-600" />
        </div>

        {/* Bottom Navigation Tabs */}
        <nav>
          <ul className="space-y-3">
            {bottomTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-16 h-20 flex flex-col items-center justify-center gap-1 rounded-[2rem] transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    title={tab.label}
                  >
                    <Icon className="text-xl" />
                    <span className="text-xs font-medium text-center">{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
