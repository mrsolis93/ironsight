import { useQuery } from "react-query";
import LinearProgress from "@mui/material/LinearProgress";
import { getClassList } from "../IronsightAPI";

export default function ClassList() {
  const { data, isLoading, isError } = useQuery("class_list", getClassList);

  if (isLoading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error!</p>
      </div>
    );
  }

  return data.map(({ tag, sub_tag }) => (
    <tr key={tag} className="hover">
      <label htmlFor="my-modal-5" className="modal-button cursor-pointer">
        <div className="card md:w-96 bg-base-100 shadow-xl m-3">
          <figure>
            <img
              className="object-cover h-48 min-w-full"
              src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777046/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{tag}</h2>
            <p>{sub_tag}</p>
          </div>
        </div>
      </label>
    </tr>
  ));
}
