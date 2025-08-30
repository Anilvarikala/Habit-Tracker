import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  async function Logout() {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`);
    console.log(res);
    localStorage.removeItem("AnilToken");
    window.location.href = "/login";
  }

  async function fetchHabits() {
    try {
      const userId = localStorage.getItem("appId");
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/habit/allhabits`,
        { userId },
        {
          headers: {
            token: localStorage.getItem("AnilToken"),
            userId: localStorage.getItem("appId"),
          },
        }
      );
      setHabits(result.data.habits || []);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  }

  async function addStreak(habitId) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/habit/streakplus`,
        { habitId, userId: localStorage.getItem("appId") },
        {
          headers: {
            token: localStorage.getItem("AnilToken"),
            userId: localStorage.getItem("appId"),
          },
        }
      );

      // update streak in state
      setHabits((prev) =>
        prev.map((h) =>
          h.habitId === habitId ? { ...h, streak: h.streak + 1 } : h
        )
      );
    } catch (err) {
      console.error("Error adding streak:", err);
    }
  }

  async function addHabit(e) {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/habit/add`,
        { habitName: newHabit, userId: localStorage.getItem("appId") },
        {
          headers: {
            token: localStorage.getItem("AnilToken"),
            userId : localStorage.getItem('appId')
          },
        }
      );

      console.log("Habit Added:", result.data);

      // add to UI instantly
      setHabits([...habits, result.data.habit]);
      setNewHabit("");
      setShowForm(false);
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  }

   async function removeHabit(habitId){

    const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/habit/remove`, {
      userId : localStorage.getItem("appId"),
      habitId : habitId
     })
     
     const newHabits = habits.filter((habit) => habit.habitId !== habitId)
     setHabits(newHabits)
     console.log(result)
     
   }

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">MyApp</div>
        <ul className="navbar-links">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li onClick={() => Logout()}>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="home-content">
        <h1>Your Habits</h1>

        {/* Add Habit Button */}
        <button className="add-habit-btn" onClick={() => setShowForm(true)}>
          + Add Habit
        </button>

        {/* Habit Form Popup */}
        {showForm && (
          <div className="habit-form">
            <form onSubmit={addHabit}>
              <input
                type="text"
                placeholder="Enter habit name"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                required
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Habit List */}
        <div className="habit-list">
          {habits.length > 0 ? (
            habits.map((habit) => (
              <div key={habit._id} className="habit-card">
                <h3>{habit.habitName}</h3>
                <p>
                  Streak: <strong>{habit.streak}</strong> 🔥
                </p>
                <button onClick={() => addStreak(habit.habitId)}>
                  + Add Streak
                </button>
                <br /><br />
                  <button className="red" onClick={() => removeHabit(habit.habitId)}>
                   Remove Habit
                </button>
              </div>
            ))
          ) : (
            <p>No habits found. Start by adding one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
