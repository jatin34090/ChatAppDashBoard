import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import MarkForReviewed from "../assets/markForReviewed.png";
import SaveAsLater from "../assets/saveAsLater.png";
// import UnMarkForReviewed from "../assets/UnMarkForReviewed.png";
const Users = ({
  transcriptID,
  bgColor = "bg-white",
  ID,
  time,
  tags,
  allTagNames,
}) => {
  // const [allTagNames, setAllTagNames] = useState([]);
  const [labels, setLabels] = useState([]);
  const [markAsReviewed, setMarkAsReviewed] = useState(false);
  const [saveForLater, setSaveForLater] = useState(false);
  const projectID = "66a924f06b56308fbf96bb29";

  const removeTag = async (tag) => {
    // console.log("tag", tags);
    const newTags = labels.filter((t) => {
      // console.log("t", t);
      return t[0] !== tag;
    });

    const newLabels = newTags
      .map((tag) => {
        const labelData = allTagNames.find((data) => data[0] === tag[0]);
        return labelData ? labelData : null;
      })
      .filter((label) => label !== null); // Remove null values

    setLabels(newLabels);

    // setLabels(newTags);

    const url = `https://api.voiceflow.com/v2/transcripts/${projectID}/${transcriptID}/report_tag/${tag}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
    };
    await fetch(url, options)
      .then((res) => console.log("res", res))
      .catch((err) => console.error("error:" + err));
  };

  useEffect(() => {
    if (allTagNames.length > 0 && tags) {
      // console.log("allTagNames", tags);
      const newLabels = tags
        .map((tag) => {
          const labelData = allTagNames.find((data) => data[0] === tag);
          return labelData ? labelData : null;
        })
        .filter((label) => label !== null); // Remove null values

      let reviewed = tags.filter((tag) => {
        return tag === "system.reviewed";
      });
      let save = tags.filter((tag) => {
        return tag === "system.saved";
      });
      // reviewed.length>0 && console.log("markAsReviewed", newLabels)
      // reviewed.length>0 && console.log("transcriptID", transcriptID)
      reviewed.length > 0 ? setMarkAsReviewed(true) : setMarkAsReviewed(false);
      save.length > 0 ? setSaveForLater(true) : setSaveForLater(false);

      setLabels(newLabels);
    }
  }, [allTagNames, tags]);
  const date = parseISO(time);
  const formattedDate = format(date, "h:mm a, MMM d");

  return (
    <div
      className={`overflow-hidden flex gap-4 p-4 my-2 hover:bg-gray-200 ${bgColor}`}
    >
      <div>.</div>
      <div className="">
        <h2>User</h2>
        <p className="text-bold text-gray-400">UserID: {ID}</p>
        <div className="text-bold text-gray-400 ">
          <p>{formattedDate}</p>
          <div></div>
          <div className=" mt-2 p-3 w-full flex justify-center items-center">
            {labels &&
              labels.map((label, index) => (
                <div
                  key={index}
                  className="mr-2 flex gap-4 bg-gray-300 py-1 px-3 "
                >
                  {label[1].label}
                  <button onClick={() => removeTag(label[0])}>X</button>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-gray-400">
        {markAsReviewed && (
          <span className="w-8 ">
            <img src={MarkForReviewed} alt="" />
          </span>
        )}
        {saveForLater &&<span className="w-8">
            <img src={SaveAsLater} alt="" />
          </span>}
      </div>
    </div>
  );
};

export default Users;
