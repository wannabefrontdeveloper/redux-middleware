import { connect } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";
import React, { useEffect } from "react"; // React import 추가

const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  // 클래스 형태 컴포넌트였다면 componentDidMount
  useEffect(() => {
    // useEffect에 파라미터로 넣는 함수는 async 할 수 없기 때문에
    // 그 내부에서 async 함수를 선언하고 호출해줍니다.
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers(1);
      } catch (e) {
        console.log(e); //에러 조회
      }
    };
    fn();
  }, [getPost, getUsers]); // 의존성 배열 수정

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  ({ sample, loading }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: loading["sample/GET_POST"],
    loadingUsers: loading["sample/GET_USERS"],
  }),
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
