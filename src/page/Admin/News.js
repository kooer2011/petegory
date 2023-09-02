import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { Table, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  const addNews = () => {
    navigate('/createnews');
  };
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <div className="m-1">
            <button className="btn btn-primary">Edit</button>
          </div>
          <div className="m-1">
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="mt-1 m-0">News List</h1>
      <button className="btn btn-success m-2" onClick={addNews}>
        Add +
      </button>
      <Table
        columns={columns}
        dataSource={news}
        pagination={{ pageSize: 3, total: news.length }}
      />
    </Layout>
  );
};

export default News;
