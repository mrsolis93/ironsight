import React from "react";
import "../App.css";
import "../Components/Widgets/UsersWidget";

function Sandbox() {
  const [lab_list, setLabList] = React.useState([]);
  const get_labs = () => {
    fetch("https://api.rellis.dev/get.php?q=get_labs")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        var lab_list = data.map(function (lab) {
          return (
              <tr class="hover cursor-pointer">
                <td>{lab.lab_num}</td>
                <td>
                  <div class="flex items-center space-x-3">
                    <div>
                      <div class="font-bold">{lab.lab_name}</div>
                      <div class="badge">linux</div>
                      <div class="badge">csci 359</div>
                      <div class="badge">cryptography</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    {/* <p>Back in 2012, there was an internet phenomenon known as Cicada 3301. It was a worldwide puzzle/mystery that remains unsolved to this day. Cicada 3301 has been described as “the most baffling and enigmatic mystery on the Internet”. On three occasions, Cicada 3301 has posted spectacular puzzles on the internet and dark web, with the stated intent of "recruiting intelligent individuals". There has been much speculation and theories about Cicada 3301, including that they are recruitment tools for the NSA, MI6, Illuminati, a cult, or a hacker group. Many first thought Cicada 3301 was an Alternate Reality Game, but still very few known where this rabbit hole leads to. Those who do have disappeared from the internet.</p> */}
                    <p class="w-96 relative overflow-x-auto break-words whitespace-normal max-h-24">
                      {lab.lab_description}
                    </p>
                  </div>
                </td>
                <td>{lab.date_start}</td>
                <td>{lab.date_end}</td>
              </tr>
          );
        });
        setLabList(lab_list);
      });
  };
  React.useEffect(() => {
    get_labs();
  }, []);

  return (
    <div className="App">
      {/* Card 1 */}
      <div className="row_1 flex md:flex-row flex-col">
        <div class="card md:w-96 bg-base-100 shadow-xl m-3">
          <figure>
            <img
              class="object-cover h-48 min-w-full md:w-96"
              src="https://svitla.com/uploads_converted/0/2135-database_management_software.webp?1560161553"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">CSCI 359 - Systems Analysis</h2>
            <p>Labs Here</p>
          </div>
        </div>

        <input type="checkbox" id="my-modal-5" class="modal-toggle" />
        <label for="my-modal-5" class="modal cursor-pointer">
          <label class="modal-box w-11/12 max-w-full max-h-full" for="">
            <label
              for="my-modal-5"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <div class="mb-3">
              <h1 class="card-title">CSCI 359 - Systems Analysis and Design</h1>
            </div>
            <div class="overflow-x-auto w-full">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th>Lab#</th>
                    <th>Lab Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>

                {/* <tbody> */}
                {/*make the lab list line up with the table headers  */}

                {lab_list}
                {/* </tbody> */}
              </table>
            </div>
          </label>
        </label>

        {/* Card 2 */}
        <label for="my-modal-5" class="modal-button">
          <div class="card md:w-96 bg-base-100 shadow-xl m-3">
            <figure>
              <img
                class="object-cover h-48 min-w-full"
                src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777046/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">CSCI 440 - Database Design</h2>
              <p>Labs Here</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Sandbox;
