import React, { lazy, useEffect, useRef, useState } from "react";
import Users from "./Users";
import BotMessage from "./BotMessage";
import UserMesage from "./UserMesage";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import more from "../assets/more.png";
import arrowdown from "../assets/arrowdown.png";
import NoTranscript from "./noTranscript";
import List from "./List";
import ManageTags from "./ManageTags";
import MarkForReviewed from "../assets/markForReviewed.png";
import UnMarkForReviewed from "../assets/UnMarkForReviewed.png";
import SaveAsLater from "../assets/saveAsLater.png";
import NotSaveAsLater from "../assets/NotSaveAsLater.png";

import deleteIcon from "../assets/delete.png";
// import saveForLater from "../assets/saveForLater.png";
// import UnSaveForLater from "../assets/UnSaveForLater.png";
const Chat = () => {
  const projectID = "66a924f06b56308fbf96bb29";

  const [userData, setUserData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState(false);
  const [tagFilter, setTagFilter] = useState(false);
  const [selected, setSelected] = useState("All time");
  const [isOpen, setIsOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [tagName, settagName] = useState("");
  const [addTag, setAddTag] = useState([]);
  const [allTagNames, setAllTagNames] = useState([]);
  const [showList, setShowList] = useState(false);
  const [records, setRecords] = useState([]);
  const [manageTags, setManageTags] = useState(false);
  const inputRef = useRef(null);
  const filterRef = useRef(null);
  const filterBtnRef = useRef(null);
  const [tagForSearch, setTagForSearch] = useState([]);
  const [index, setIndex] = useState(0);
  const [markAsReviewed, setMarkAsReviewed] = useState(false);
  const [saveForLater, setSaveForLater] = useState(false);
  const [tagsData, setTagsData] = useState([]);

  const filter = (e) => {
    setAddTag(e.target.value);
    setRecords(() =>
      allTagNames.filter((tag) => tag[1].label.includes(e.target.value))
    );
  };

  const options = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 days",
    "All time",
  ];

  const handleClearClick = () => {
    setSelected("All time");
    setTimeFilter(false);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setMenuOpen(false);
    console.log(option);
  };
  function replaceSpaces(str) {
    return str.replace(/ /g, "%20");
  }
  const fetchData = async () => {
    const range = replaceSpaces(selected);

    setLoading(true);
    const url = `https://api.voiceflow.com/v2/transcripts/66a924f06b56308fbf96bb29?range=${range}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setUserData(() => Object.entries(data));
      if (data.length > 0) {
        setUserID((prev) => {
          if (prev !== "") {
            return prev;
          } else {
            return data[0]._id;
          }
        });
      } else {
        setUserID("");
        setMessages([]);
      }

      // console.log("userID", userID);
      console.log("data", data);
      let dataTags = [];
      if (userID !== "") {
        dataTags = [
          ...Object.entries(data).filter((item, index) => {
            return item[1]._id === userID;
          }),
        ];
      } else {
        dataTags = [
          ...Object.entries(data).filter((item, index) => {
            return item[1]._id === data[0]._id;
          }),
        ];
      }
      setTagsData(() => dataTags[0]);
      console.log("dataTags", dataTags);
    } catch (err) {
      console.error("error:" + err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  const handleTagFilter = (e) => {
    setTagFilter(!tagFilter);
  };
  const handleCheckBoxInput = (e) => {
    setTimeFilter(!timeFilter);
  };

  const tagFilterHandler = () => {
    const baseUrl =
      "https://api.voiceflow.com/v2/transcripts/66a924f06b56308fbf96bb29";
    let urlWithTags = baseUrl;

    tagForSearch.forEach((tag, index) => {
      urlWithTags += index === 0 ? `?tag=${tag}` : `&tag=${tag}`;
    });

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
    };

    fetch(urlWithTags, options)
      .then((res) => res.json())
      .then((json) => setUserData(Object.entries(json)))
      .catch((err) => console.error("error:" + err));
  };

  const removeTagFilterHandler = (tagID) => {
    setTagForSearch((prev) => {
      return prev.filter((tag) => tag !== tagID);
    });
  };

  const clickHandler = async () => {
    // console.log("userID", userID);
    setMessageLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
    };

    await fetch(
      `https://api.voiceflow.com/v2/transcripts/66a924f06b56308fbf96bb29/${userID}`,
      options
    )
      .then((res) => res.json())
      .then((value) => {
        console.log("user json ", value);
        setMessages(Object.entries(value));
      })
      .catch((err) => console.error("error:" + err));

    setMessageLoading(false);
  };

  const addNewTag = async (tagID) => {
    const url = `https://api.voiceflow.com/v2/transcripts/66a924f06b56308fbf96bb29/${userID}/report_tag/${tagID}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
    };
    await fetch(url, options)
      .then()
      .catch((err) => console.error("error:" + err));
  };

  const addTagOnTranscript = async (item) => {
    console.log("item on click", item);
    console.log("records", records);
    await addNewTag(item[0]);
    await fetchData();

    setRecords(records.filter((record) => record[1].label !== item.label));
  };
  const clickHandlerManageTags = () => {
    setManageTags(true);
  };

  const checkTagIsExist = (label) => {
    const tag = allTagNames.find((tag) => tag[1].label === label);

    // console.log("check tag is available or noty ", tag);
    return tag ? true : false;
  };

  // const removeTag = async(tag) => {

  //   // setLabels(newTags);

  //   const url = `https://api.voiceflow.com/v2/transcripts/${projectID}/${userID}/report_tag/${tag}`;
  //   const options = {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
  //     },
  //   };
  //   await fetch(url, options)
  //     .then((res) => console.log("res", res))
  //     .catch((err) => console.error("error:" + err));
  // };

  const buttonTag = async (tag) => {
    let reportTags = [];

    if (
      tag === "system.reviewed" &&
      tagsData[1].reportTags.filter((item) => item === tag).length > 0
    ) {
      reportTags = [...tagsData[1].reportTags.filter((item) => item !== tag)];
      setMarkAsReviewed(false);
    } else if (
      tag === "system.saved" &&
      tagsData[1].reportTags.filter((item) => item === tag).length > 0
    ) {
      reportTags = [...tagsData[1].reportTags.filter((item) => item !== tag)];
      setSaveForLater(false);
    } else {
      reportTags = [...tagsData[1].reportTags, tag];
      if (tag === "system.reviewed") {
        setMarkAsReviewed(true);
      } else if (tag === "system.saved") {
        setSaveForLater(true);
      }
    }

    console.log("tagsData", tagsData);
    console.log("reportTags", reportTags);
    console.log("tagsData with report tags", [reportTags, tag]);
    console.log("tags", [tag]);
    const url = `https://api.voiceflow.com/v2/transcripts/66a924f06b56308fbf96bb29/${userID}`;
    const options = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
      body: JSON.stringify({ data: { reportTags: reportTags } }),
    };

    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("button tags json", json);
        // setTagsData(()=>[reportTags]);
      })
      .catch((err) => console.error("error:" + err));

    fetchData();
  };

  const showTags = async () => {
    const url = `https://api.voiceflow.com/v2/projects/66a924f06b56308fbf96bb29/tags`;
    const options = {
      method: "GET",
      headers: {
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
    };

    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setAllTagNames(Object.entries(json));
        setRecords(Object.entries(json));
      })
      .catch((err) => console.error("error:" + err));
  };

  const createTag = () => {
    if (checkTagIsExist(addTag)) {
      setAddTag("");
      return alert("Tag already exist");
    }

    console.log("addTag", addTag);
    console.log("tagName", tagName);

    const url = `https://api.voiceflow.com/v2/projects/66a924f06b56308fbf96bb29/tags`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: addTag || tagName,
      }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then(async (json) => {
        console.log("checked json", json);
        // 9667828796
        // setAllTagNames([...allTagNames, json]);
        await addTagOnTranscript([json.tagID]);
        await showTags();
      })
      .catch((err) => console.error("error:" + err));

    setAddTag("");
  };

  useEffect(() => {
    if (tagName) {
      createTag();
    }
  }, [tagName]);

  useEffect(() => {}, [allTagNames]);

  useEffect(() => {
    if (userID) {
      clickHandler();
    }
    console.log("userID", userID);
  }, [userID]);

  useEffect(() => {
    showTags();
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowList(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    tagFilterHandler();
  }, [tagForSearch]);

  return (
    <div className="admin-container">
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <div className=" grid grid-cols-12">
          <div
            className="flex flex-col items-center overflow-y-auto cursor-pointer border-2 col-span-3"
            style={{ maxHeight: "100vh", scrollbarWidth: "thin" }}
          >
            <div className="sticky top-0 w-full">
              <div className=" flex justify-between bg-white p-5 border-black border-b-2">
                <h1>Transcripts ({userData.length})</h1>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  ref={filterBtnRef}
                >
                  <img className="w-10" src={more} alt="" />
                </button>
              </div>

              {menuOpen && (
                <div className=" absolute right-0 bg-gray-40 bg-gray-100" ref={filterRef}>
                  <div className="flex gap-32 justify-around items-center px-4 py-2 mx-4 my-2 border-4 bg-white">
                    <h4 className=" text-xs ">ADD FILTERS</h4>
                    <button onClick={handleClearClick}>Clear</button>
                  </div>
                  <div className="flex gap-3 items-center mx-4 my-2 px-4 py-2 border-4  bg-white">
                    <input
                      type="checkbox"
                      checked={timeFilter}
                      onChange={handleCheckBoxInput}
                    />

                    <h4 className=" text-xs ">Time Range</h4>
                  </div>

                  {timeFilter && (
                    <div className="relative flex flex-col mx-4 my-2 px-4 py-2 border-4  bg-white">
                      <div className="flex justify-between border m-3 p-2">
                        <div className="p-2 cursor-pointer ">{selected}</div>
                        <button
                          className=" "
                          onClick={() => {
                            setIsOpen(!isOpen);
                            setTagOpen(false);
                          }}
                        >
                          <img className="w-5" src={arrowdown} alt="" />
                        </button>
                      </div>
                      {isOpen && (
                        <div className="flex flex-col border bg-white ">
                          {options.map((option) => (
                            <div
                              key={option}
                              className=" border-2 p-3 cursor-pointer hover:bg-gray-200"
                              onClick={() => handleSelect(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex gap-3 items-center mx-4 my-2 px-4 py-2 border-4  bg-white">
                    <input
                      type="checkbox"
                      checked={tagFilter}
                      onChange={handleTagFilter}
                    />

                    <h4 className=" text-xs ">Filter</h4>
                  </div>
                  {tagFilter && (
                    <div className="relative flex flex-col mx-4 my-2 px-4 py-2 border-4  bg-white ">
                      <div className="flex justify-between border m-3 p-2">
                        {/* <div className="p-2 cursor-pointer ">{selected}</div> */}
                        <input
                          className="cursor-pointer outline-none"
                          type="text"
                          placeholder="Add Tag"
                          onClick={() => {
                            setTagOpen(!tagOpen);
                            setIsOpen(false);
                          }}
                        />
                        {/* <button
                          className=" "
                          
                        >
                          <img className="w-5" src={arrowdown} alt="" />
                        </button> */}
                      </div>

                      <div className="">
                        {tagOpen && (
                          <div
                            className="flex flex-col border bg-white max-h-[200px] overflow-y-auto "
                            style={{ scrollbarWidth: "thin" }}
                          >
                            <div className="border-b-2 w-full mb-3 pb-3 bg-white">
                              <div
                                key={"system.reviewed"}
                                className="flex gap-3 items-center mx-4 my-2 px-4 py-2 border-4  bg-white"
                              >
                                {console.log("tagForSearch", tagForSearch)}
                                <input
                                  type="checkbox"
                                  checked={tagForSearch.includes(
                                    "system.reviewed"
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      // tagFilterHandler(option[0]);
                                      setTagForSearch((prev) => [
                                        ...prev,
                                        "system.reviewed",
                                      ]);
                                    } else {
                                      removeTagFilterHandler("system.reviewed");
                                    }
                                  }}
                                />
                                <div className="flex w-full gap-4 items-center justify-between">

                                <h4 className=" text-xs "> {"Reviewed"}</h4>
                                <span className="w-8 ">
                                  <img src={MarkForReviewed} alt="" />
                                </span>
                                </div>

                              </div>
                              <div
                                key={"system.saved"}
                                className="flex gap-3 items-center mx-4 my-2 px-4 py-2 border-4  bg-white"
                              >
                                <input
                                  type="checkbox"
                                  checked={tagForSearch.includes(
                                    "system.saved"
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      // tagFilterHandler(option[0]);
                                      setTagForSearch((prev) => [
                                        ...prev,
                                        "system.saved",
                                      ]);
                                    } else {
                                      removeTagFilterHandler("system.saved");
                                    }
                                  }}
                                />

                                
                                <div className="flex w-full gap-4 items-center justify-between">

                                <h4 className=" text-xs "> {"Saved For Later"}</h4>
                                <span className="w-8 ">
                                  <img src={SaveAsLater} alt="" />
                                </span>
                                </div>
                              </div>
                            </div>
                            {allTagNames.map((option, index) => (
                              <div
                                key={index}
                                className="flex gap-3 items-center mx-4 my-2 px-4 py-2 border-4  bg-white"
                              >
                                <input
                                  type="checkbox"
                                  checked={tagForSearch.includes(
                                    option[0]
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      // tagFilterHandler(option[0]);
                                      
                                      setTagForSearch((prev) => [
                                        ...prev,
                                        option[0],
                                      ]);
                                    } else {
                                      removeTagFilterHandler(option[0]);
                                    }
                                  }}
                                />

                                <h4 className=" text-xs ">
                                  {" "}
                                  {option[1].label}
                                </h4>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {userData &&
              userData.map((item, index) => {
                return (
                  <div
                    className="w-full"
                    key={index}
                    onClick={async () => {
                      setUserID(item[1]._id);
                      setIndex(index);
                      setTagsData(item);
                    }}
                  >
                    <Users
                      bgColor={
                        userID === item[1]._id &&
                        "bg-gray-200 border-l-2 border-sky-400"
                      }
                      key={index}
                      transcriptID={item[1]._id}
                      ID={item[1].sessionID}
                      time={item[1].createdAt}
                      tags={item[1].reportTags}
                      allTagNames={allTagNames}
                    />
                  </div>
                );
              })}
          </div>
          <div className="col-span-6 z-0">
            {messageLoading ? (
              <Loader />
            ) : messages && messages.length === 0 ? (
              <NoTranscript />
            ) : (
              <div
                className="flex flex-col overflow-y-auto cursor-pointer w-full"
                style={{ maxHeight: "100vh" }}
              >
                {messages.map((item, index) => {
                  if (item[1].type === "text") {
                    return (
                      <BotMessage
                        key={index}
                        message={item[1].payload.payload.message}
                      />
                    );
                  } else if (item[1].type === "request") {
                    if (item[1].payload.type === "intent") {
                      return (
                        <UserMesage
                          key={index}
                          message={item[1].payload.payload.query}
                        />
                      );
                    }
                  }
                })}
              </div>
            )}
          </div>

          <div className="grid grid-rows-[auto,1fr] h-screen col-span-3 border-l-2 text-center p-4">
            <div className="border-b-2 bg-gray-100 py-3 rounded-2xl my-2">
              <h2 className="p-3 text-2xl font-bold">Actions</h2>
              <button
                className="hover:bg-gray-300 flex w-full text-black p-3 px-7 justify-around items-center"
                onClick={() => {
                  buttonTag("system.reviewed");
                }}
              >
                <p className="w-40 text-lg font-bold">Mark as Reviewed</p>
                <span className="ml-2 w-8">
                  {tagsData.length > 0 &&
                  tagsData[1].reportTags.filter(
                    (item) => item === "system.reviewed"
                  ).length > 0 ? (
                    <img src={MarkForReviewed} alt="" />
                  ) : (
                    <img src={UnMarkForReviewed} alt="" />
                  )}
                </span>
              </button>
              <button
                className="hover:bg-gray-300 flex w-full text-black p-3 px-7 justify-around items-center"
                onClick={() => {
                  buttonTag("system.saved");
                }}
              >
                <p className="w-40 text-lg font-bold">Save for Later</p>
                <span className="ml-2 w-8">
                  {tagsData.length > 0 &&
                  tagsData[1].reportTags.filter(
                    (item) => item === "system.saved"
                  ).length > 0 ? (
                    <img src={SaveAsLater} alt="" />
                  ) : (
                    <img src={NotSaveAsLater} alt="" />
                  )}
                </span>
              </button>
              <button
                className="hover:bg-gray-300 flex w-full text-black p-3 px-7 justify-around items-center"
                onClick={() => {
                  console.log("clicked");
                  showTags();
                }}
              >
                <p className="w-40 text-lg font-bold">Delete</p>
                <span className="ml-2 w-8">
                  <img src={deleteIcon} alt="" />
                </span>
              </button>
            </div>
            <div className="px-4 py-6 bg-gray-100 mt-2 overflow-auto rounded-2xl">
              <h2 className="pb-3 text-2xl font-bold">Tags</h2>

              <div className="rounded-2xl">
                <input
                  className=" w-full border-2 outline-none p-2"
                  ref={inputRef}
                  value={addTag}
                  placeholder="Add tags"
                  onChange={filter}
                  onClick={() => {
                    console.log("clicked");
                    setShowList(true);
                    // showTags();
                  }}
                />
              </div>
              <div className="w-full">
                <div className="relative pt-2 pb-0 text-start w-full ">
                  {showList && (
                    <div className=" bottom-0 cursor-pointer shadow-2xl rounded-xl border-4">
                      <div className="cursor-pointer shadow-2xl rounded-xl border-2">
                        <ul className=" max-h-[150px] overflow-auto ">
                          {addTag &&
                            !checkTagIsExist(addTag) &&
                            addTag.length > 0 && (
                              <li>
                                <span>{addTag} </span>
                                <button onClick={createTag}>Add</button>
                              </li>
                            )}
                          {records.map((item, index) => (
                            <li
                              key={index}
                              className="hover:bg-gray-200 p-3 "
                              onClick={() => addTagOnTranscript(item)}
                            >
                              {item[1].label}
                            </li>
                          ))}
                        </ul>
                        <div>
                          <button
                            className="p-6 border-t-2 border-gray-400 w-full text-xl text-sky-400 "
                            onClick={clickHandlerManageTags}
                          >
                            Manage Tags
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {manageTags && (
                    <ManageTags
                      data={allTagNames}
                      setManageTags={setManageTags}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
