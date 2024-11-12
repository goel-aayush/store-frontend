import React, { useEffect, useState } from "react";
import axios from "../../axiosauth/axiosConfig"; // Assuming you have axios configured
import { MdEmail } from 'react-icons/md'; // Importing email icon

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmailNotifications = async () => {
      try {
        const user_id = localStorage.getItem("user_id");

        if (!user_id) {
          setError("User ID not found.");
          setLoading(false);
          return;
        }

        // Make an API request to fetch email notifications
        const response = await axios.get(`/api/user/email_notifications?user_id=${user_id}`);
        setEmails(response.data.notifications);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch email notifications.");
        setLoading(false);
      }
    };

    fetchEmailNotifications();
  }, []);

  if (loading) {
    return <p>Loading email notifications...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Email Notifications</h2>
      {emails.length > 0 ? (
        <div className="space-y-4">
          {emails.map((email) => (
            <div key={email._id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">{new Date(email.sentAt).toLocaleString()}</p>
              <p className="text-lg font-medium">{email.subject}</p>
              <p className={`font-semibold ${email.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                {email.status}
              </p>
              <p className="text-sm">{email.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <MdEmail className="text-6xl text-gray-400 mb-4" /> {/* Email icon */}
          <h3 className="text-lg font-bold text-gray-800">No Emails Yet!</h3>
          <p className="text-gray-600">You have not received any email notifications.</p>
          <p className="text-gray-600">Stay tuned for updates!</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Refresh Inbox
          </button>
        </div>
      )}
    </div>
  );
};

export default Inbox;
