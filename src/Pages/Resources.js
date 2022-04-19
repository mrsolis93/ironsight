import React from "react";
import "../App.css";
import Navbar from "../Components/Navbar";

import HypervisorCPUWidget from "../Components/Widgets/Hypervisor/HypervisorNetworkWidget";
import HypervisorNetworkWidget from "../Components/Widgets/Hypervisor/HypervisorNetworkWidget";
import HypervisorMemoryWidget from "../Components/Widgets/Hypervisor/HypervisorMemoryWidget";
import HypervisorDiskWidget from "../Components/Widgets/Hypervisor/HypervisorDiskWidget";
import VMsOnWidget from "../Components/Widgets/VMStats/VMsOnWidget";
import VMsTotalWidget from "../Components/Widgets/VMStats/VMsTotalWidget";
import MemoryProgress from "../Charts/MemoryProgress";
import CPUProgress from "../Charts/CPUProgress";
import ReAreaChartMultiple from "../Charts/ReAreaChartMultiple";

function Resources() {
   

  return (
    
 
    <div className="resources">
    <Navbar />
    

    
  
    <div className="flex md:flex-row flex-col mt-3 mr-3 ml-3">
        {/* Widget Card */}
        

        <div className="md:w-1/3 rounded-box bg-base-100 shadow-md m-3 self-center" >
        <legend className="text-xl font-bold text-white-800 mr-4 mt-4 ml-4" >
           <a href="#">Virtual machine</a>
    </legend>
         <div className="card-body">
             <div className="card-title">
             <VMsOnWidget />
             <VMsTotalWidget />
             </div>
          </div>
       </div>




        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center" >
         
          <legend className="text-xl font-bold text-white-800 mr-4 mt-4 ml-4" >
            <a href="#">Memory Usage</a>
          </legend>
              <div className="card-body">
              <MemoryProgress />
              </div>
        </div>
        
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center" >
        <legend className="text-xl font-bold text-white-800 mr-4 mt-4 ml-4" >
            <a href="#">CPU Usage</a>
          </legend>
          <div className="card-body">
           
            <CPUProgress />
            
          </div>
        </div>
        
        
        
      </div>



    
    

    
    <div className="flex md:flex-row flex-col mt-4 mr-4 ml-4"> 

     
        
        
        <div className="md:w-full rounded-box bg-base-100 shadow-xl m-3 self-center" >
          
          <div className="card-body">
          CPU Usage:
          <ReAreaChartMultiple />
            
          </div>
        </div>
        
        

        
      </div>
    
      {/* Upper row */}
      <div className="flex md:flex-row flex-col mt-3 mr-3 ml-3">
        {/* Widget Card */}
        
        
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center" >
          <div className="card-body">
            CPU(I/O) Usage:
            <HypervisorCPUWidget />
            
          </div>
        </div>
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center" >
          <div className="card-body">
            Memory
            <HypervisorMemoryWidget />
            
          </div>
        </div>
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center" >
          <div className="card-body">
            Network(I/O):
            <HypervisorNetworkWidget />
            
          </div>
        </div>
        
        
      </div>
      {/* Lower Row */}
      


      <div className="flex md:flex-row flex-col mr-3 ml-3">
        {/* Widget Card */}
        <div className="md:w-full rounded-box bg-base-100 shadow-xl m-3 self-center">
          <div className="card-body">
            Disk Utilization(I/O):
            <HypervisorDiskWidget />
          </div>
        </div>
        {/* Widget Card */}
     
        {/* Widget Card */}
        
      </div>

      
    </div>



    
  );
};







export default Resources;
