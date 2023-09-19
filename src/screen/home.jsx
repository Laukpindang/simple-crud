import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get('http://localhost:4000/data')
      .then((res) => {
        setTaskList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:4000/data/${id}`).then(() => {
      fetchData();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <span>loading...</span>;
  }

  return (
    <div className='px-2 py-3 mx-auto my-0 w-[300px]'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl'>List</h1>
        <span
          className='font-bold underline cursor-pointer'
          onClick={() => navigate('/add')}
        >
          Add new
        </span>
      </div>
      {taskList.length === 0 && (
        <div>
          <p className='text-2xl font-bold'>No data...</p>
        </div>
      )}
      {taskList.length > 0 && (
        <>
          <div className='grid grid-cols-3 mb-2 gap-2'>
            <div>
              <h4 className='text-lg'>Task Name</h4>
            </div>
            <div>
              <h4 className='text-lg'>Deadline</h4>
            </div>
            <div>
              <h4 className='text-lg'>Action</h4>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {taskList.map((item) => (
              <React.Fragment key={item.id}>
                <div>
                  <span>{item.task}</span>
                </div>
                <div>
                  <span>{item.deadline}</span>
                </div>
                <div className='flex gap-2'>
                  <button
                    className='bg-primary rounded text-white p-1'
                    onClick={() => navigate(`/detail/${item.id}`)}
                  >
                    Detail
                  </button>
                  <button
                    className='bg-primary rounded text-white p-1'
                    onClick={() => navigate(`/edit/${item.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-primary rounded text-white p-1'
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
