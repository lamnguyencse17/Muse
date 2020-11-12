import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="w-100 h-100 rounded overflow-hidden shadow-lg">
        {/* <img className="w-full" src={require('./profile.jpg')} alt="Display" /> */}
        <div className="px-6 py-4">
          <div className="font-bold text-purple-500 text-xl mb-2">
            Blessing Krofegha
          </div>
          <p className="text-gray-700 text-base">
            When i’m not coding i switch to netflix with biscuits and cold tea
            as my companion. <span></span>😜
          </p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #Software Engineer
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #Writter
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 ml-20">
            #Public Speaker
          </span>
        </div>
        <div className="inline-block animate-spin ease duration-300 w-5 h-5 bg-black m-2"/>
      </div>
    );
  }
}

export default Landing;
