/*
  Start here and work your way down the nested components.
  Not all files in the project need code added.
  Look at each file to see what props need to be passed!
*/

import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Posts from '../Posts/Posts.js';
import SearchBar from '../SearchBar/SearchBar.js';
import dummyData from '../../data/dummy-data.js';

const App = () => {
  const [posts, setPosts] = useState(dummyData);
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function pics() {
      const arr = [];
      for(let i = 0; i < posts.length; i++) {
        const user = await Axios.get('https://randomuser.me/api');
        arr.push(
          posts[i] = {
            ...posts[i],
            thumbnailUrl: user.data.results[0].picture.thumbnail,
            imageUrl: user.data.results[0].picture.large
          }
        );
      }
      setPosts(arr);
    }
    pics();
  }, []);

  // increases the number of likes by one of the post with a given id.
  const likePost = postId => {
    const postArr = [];
      posts.map(
        post => {
          postArr.push(
            postId === post.id ? {...post, likes: post.likes + 1} : post
          );
        }
      );
    setPosts(postArr);
  };

  return (
    <div className='App'>
      <SearchBar />
      <Posts posts={posts} likePost={likePost}/>
    </div>
  );
};

export default App;
