import React, { useEffect, useState } from "react";

const ManageTags = ({ data, setManageTags }) => {
  const [allTagNames, setAllTagNames] = useState(data);

  const deleteTags = (id) => {
    const url = `https://api.voiceflow.com/v2/projects/66a924f06b56308fbf96bb29/tags/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
    };

    fetch(url, options)
      .then((res) => console.log("delete res", res))
    //   .then((json) => console.log("delete json", json))
      .catch((err) => console.error("error:" + err));
  };

  const removeBtnAction = (id) => {
     deleteTags(id);
    allTagNames.splice(id, 1);
    setAllTagNames([...allTagNames]);
  };

//   const showTags = () => {
//     const url = `https://api.voiceflow.com/v2/projects/66a924f06b56308fbf96bb29/tags`;
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
//       },
//     };

//     fetch(url, options)
//       .then((res) => res.json())
//       .then((json) => {
//         setAllTagNames(Object.entries(json));
//       })
//       .catch((err) => console.error("error:" + err));
//   };


//   useEffect(() => {
//     showTags();
//   }, []);
  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 "
        style={{ backgroundColor: "rgba(189,189,189,0.9)" }}
      ></div>
      <div className=" text-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-1/3 bg-white p-7 m-3 rounded-xl">
        <h1>Manage Tags</h1>
        <div className="flex flex-col gap-3 items-center justify-center ">
          <ul className="max-h-[400px] overflow-auto w-full">
            {allTagNames &&
              allTagNames.map((data) => (
                <div className="flex gap-3 " key={data[0]}>
                  <li className="w-full p-3 hover:bg-gray-400">
                    {data[1].label}
                  </li>

                  <button
                    onClick={() => removeBtnAction(data[0])}
                    className="w-full p-3 hover:bg-gray-400"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </ul>
          <div className="p-3 w-full flex justify-end bg-gray-300">
            <button onClick={() => setManageTags(false)}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageTags;
