import jwtAxios from "auth/jwt-auth/jwtaxios";
import { TestType } from "pages/dashboard/QuizPage/Types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import shuffle from "utils/shuffle";
import TestsOutput from "./TestsOutput";
import "./test.style.scss";
import { Spin } from "antd";

function TestPage() {
  const { topic } = useParams();
  const [tests, setTests] = useState<TestType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    jwtAxios
      .get(`/tests?section=${topic}`)
      .then((res) => setTests(shuffle<TestType>(res.data.data.tests)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="tests">
        <TestsOutput tests={tests} />
      </div>
    </Spin>
  );
}

export default TestPage;
