import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Analytics dashboard with mock data
function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Fetch mock analytics data
    axios.get('http://localhost:5000/automation/analytics', { withCredentials: true })
      .then(res => setAnalytics(res.data))
      .catch(() => setAnalytics({
        labels: ['Jan', 'Feb', 'Mar'],
        likes: [100, 150, 200],
        impressions: [500, 700, 900]
      }));
  }, []);

  const data = {
    labels: analytics?.labels || [],
    datasets: [
      {
        label: 'Likes',
        data: analytics?.likes || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Impressions',
        data: analytics?.impressions || [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      {analytics ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <Line data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
      <Link to="/chat" className="mt-4 inline-block text-blue-500 hover:underline">
        Back to Chat
      </Link>
    </div>
  );
}

export default Dashboard;