export const singleUserQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
  
    return query;
  };
  
  export const allUsersQuery = () => {
    const query = `*[_type == "user"]`;
  
    return query;
  };

  export const allPostsQuery = () => {
    const query = `*[_type == "message"]{
      _id,
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
      likes,
      message[]{
        message,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }      
    }`;

    return query
  };

  export const postDetailQuery = (postId) => {
    const query = `*[_type == "post" && _id == '${postId}']{
      _id,
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
       likes,
      message[]{
        message,
        _key,
        postedBy->{
          _ref,
        _id,
      },
      }
    }`;
    return query;
  };  

  export const allMessageQuery = () => {
    const query = `*[_type == "message"]{
      _id,
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
      likes,
      message,
      wow   
    }`;

    return query
  };