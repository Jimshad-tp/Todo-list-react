import './App.css'
import { useEffect, useState } from 'react'
function App() {
  const [toDo, setTodo] = useState('')
  const [toDos, setTodos] = useState(() => {
    const saved = localStorage.getItem('Storage');
    const initialValue = JSON.parse(saved)
    return (initialValue || "")
  });

  // const index = toDos && toDos.findIndex(obj => obj.statusRemove == true);
  // if (index > -1) toDos && toDos.splice((index), 1);

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const date = new Date()
  const day = dayNames[date.getDay()]



  const handleUserInput = (e) => {
    setTodo(e.target.value)
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (toDo) {
      setTodos([...toDos, {
        id: Date.now(),
        text: toDo,
        statusDone: false,
        statusDrop: false,
        statusRetrieve: false,
        statusRemove:false
      }]);
      setTodo('');
    }
  };
  const resetInputField = () => {
    setTodo('')
  };

  useEffect(() => {
    localStorage.setItem("Storage", JSON.stringify(toDos))
  }, [toDos])

  return (
    <div className="app">
      <div className="headings">
        <div className="mainHeading">
          <h1 className='gradient-text'>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2 className='gradient-text2'>Hi, it's {day}</h2>
        </div>
      </div>

      <form onSubmit={handleInputSubmit} >
        <div className="toDoInput">
          <div className="left">
            <input value={toDo} onChange={handleUserInput} type="text" placeholder="Plan something...." />
          </div>
          <div className="right erase">
            <i onClick={resetInputField} className="fas fa-eraser" title='clear'></i>
          </div>
          <div className="rightEnd  add">
            <button style={{ border: 'none', outline: 'none', backgroundColor: '#fff' }} type="submit"><i className="fas fa-plus" title="Add"></i></button>
          </div>
        </div>
      </form>
      <div className="container done">
        {
          toDos && toDos.map((obj) => {
            if (obj.statusDone && !obj.statusRemove)
              return (
                <div key={obj.id} className="toDo">
                  <div className="top">
                    <p className='textCross'>{obj.text}</p>
                  </div>
                  <div className="right bin">
                    <i onClick={(e) => {
                      e.target.value =true;
                      setTodos(toDos.filter((obj2) => {
                        if(obj2.id === obj.id){
                          obj2.statusRemove = e.target.value
                        }
                        return obj2
                      }))
                    }} value={obj.statusDrop} className="fas fa-times" title="Drop" ></i>
                  </div>

                </div>
              )
          })
        }
      </div>

      <div className="container onGoing">
        {
          toDos && toDos.map((obj) => {
            if (!obj.statusDone && !obj.statusDrop) {
              return (

                <div key={obj.id} className="toDo">
                  <div className="left tick">
                    <i onClick={(e) => {
                      e.target.value = true;
                      setTodos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusDone = e.target.value;
                        }
                        return obj2;
                      }))

                    }} value={obj.statusDone} className="fas fa-check" title='Done' ></i>
                    <div className="top">
                      <p >{obj.text}</p>
                    </div> </div>


                  <div className="right close">
                    <i onClick={(e) => {
                      e.target.value = true;
                      setTodos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusDrop = e.target.value;
                        }
                        return obj2;

                      }))

                    }} value={obj.statusDrop} className="fas fa-times" title='Drop' ></i>
                  </div>
                </div>
              )
            } else if (obj.statusRetrieve && !obj.statusDone) {
              return (
                <div key={obj.id} className="toDo">
                  <div className="left tick">
                    <i onClick={(e) => {
                      e.target.value = true;
                      setTodos(toDos.filter((obj2) => {
                        if (obj2.id === obj2.id) {
                          obj.statusDone = e.target.value;
                        }
                        return obj2;
                      }))
                    }} value={obj.statusDone} className="fas fa-check" title='Done' ></i>
                  </div>
                  <div className="top">
                    <p>{obj.text}</p>
                  </div>

                  <div className="right close">
                    <i onClick={(e) => {
                      e.target.value = true;
                      setTodos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusDrop = e.target.value;
                          obj.statusRetrieve = !e.target.value;
                        }
                        return obj2
                      }))
                    }} value={obj.statusDrop} className="fas fa-times" title="Drop" ></i>
                  </div>
                </div>
              )
            }
          })
        }

      </div>

    </div>
  );
}

export default App;
