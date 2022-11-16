import "./App.css";
import { useEffect, useState } from "react";
const categoryList = [
  "Toyota",
  "Honda",
  "Mercedes",
  "Tesla",
  "Suzuki",
  "Thar",
  "All",
];
function App() {
  const [posts, setPosts] = useState([]);
  const [original, setOriginal] = useState([]);
  const [search, setSearch] = useState("");

  function searchPost(e) {
    setSearch(e.target.value);
    setPosts(
      original.filter((ele) => ele.title.toLowerCase().includes(e.target.value))
    );
  }
  function handleCategory(e) {
    if (e.target.value == "All") {
      setPosts(original);
    } else {
      setPosts(original.filter((ele) => ele.category == e.target.value));
    }
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        let filter = data.filter((ele) => ele.id <= 10);
        let newFilter = filter.map((ele) => {
          return {
            ...ele,
            category: categoryList[Math.floor(Math.random() * 6)],
          };
        });
        setOriginal(newFilter);
        setPosts(newFilter);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row nav">
          <div className="input">
            <input
              type="text"
              placeholder="Search Post"
              value={search}
              onChange={searchPost}
              className="search"
            />
          </div>
          <div className="categoryList">
            {categoryList.map((ele, ind) => {
              return (
                <button key={ind} onClick={handleCategory} value={ele}>
                  {ele}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="posts">
            {posts.map((ele) => {
              return (
                <div className="single-post">
                  <div className="img">
                    <img src={ele.thumbnailUrl} />
                  </div>
                  <div className="title">{ele.title}</div>
                  <div className="category">{ele.category}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
