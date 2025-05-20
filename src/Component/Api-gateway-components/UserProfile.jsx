import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './UserProfile.css';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:9090/auth-service/auth/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setProfile(data);
      } catch {
        setError("Failed to fetch profile. Maybe not authenticated.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <main className="user-profile-container">
      <section className="user-profile-card" aria-live="polite">

        {error ? (
          <p className="user-profile-message user-profile-error" role="alert">{error}</p>
        ) : profile ? (
          <>
            {/* {profile.role === "DOCTOR" && (
              <div style={{ marginBottom: "16px" }}>
                <button
                  onClick={() => navigate("/doctor-dashboard")}
                  className="user-profile-edit-btn"
                >
                  Go to Dashboard
                </button>
              </div>
            )} */}

            <h2 className="user-profile-header">User Profile</h2>

            <div
              className="user-profile-avatar"
              aria-label={`Avatar for ${profile.username}`}
            >
              {profile.username?.[0]?.toUpperCase() || 'U'}
            </div>

            <div className="user-profile-username">
              <strong>Username:</strong> {profile.username}
            </div>
            <div className="user-profile-role">
              <strong>Role:</strong> {profile.role}
            </div>
            <div className="user-profile-role">
              <strong>Name:</strong> {profile.name}
            </div>
            <div className="user-profile-role">
              <strong>Email:</strong> {profile.email}
            </div>
            <div className="user-profile-username">
              <strong>Contact:</strong> {profile.contact}
            </div>
          </>
        ) : (
          <p className="user-profile-message user-profile-loading">Loading...</p>
        )}
      </section>
    </main>
  );
}
