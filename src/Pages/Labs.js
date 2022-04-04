import React from 'react'
import "../App.css";
import CurrentLabs from "../Components/Widgets/CurrentLabs";

function Labs() {
    return (
        <div className='App'>
        <div>
        <div class="max-h-10 rounded-box bg-base-100 shadow-xl m-3">
        <h2 class="card-title m-4">CSCI 440 - Database Design</h2>
        <div class="card-body">
        </div>
        </div>
        </div>
        {/* Upper row */}
          <div class="flex md:flex-row flex-col mt-3 mr-3 ml-3">
            {/* Ongoing Labs */}
            <div class="max-h-96 md:w-1/4 rounded-box bg-base-100 shadow-xl m-3 hover">
              <div class="card-body">
                <div class="flex flex-row">
                  <h2 class="card-title">Lab 1 - Cryptography</h2>

                </div>
              </div>
            </div>
            <div class="max-h-96 md:w-1/4 rounded-box bg-base-100 shadow-xl m-3 hover">
            <div class="card-body">
                <div class="flex flex-row">
                  <h2 class="card-title">Lab 2 - Linux Basics</h2>

                </div>
              </div>
            </div>
          </div>
          
        </div>
    )
}

export default Labs
