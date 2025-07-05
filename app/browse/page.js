'use client';

import { useEffect, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';

const Page = () => {
  const [reports, setReports] = useState([]);
  const [matches, setMatches] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [reunitedPets, setReunitedPets] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const handleMatchClick = (lostPet) => {
    const foundPets = reports.filter(p => p.type === 'Found');
    const potentialMatches = foundPets.filter(found => {
      const nameMatch = found.petName?.toLowerCase().includes(lostPet.petName?.toLowerCase());
      const locationMatch = found.location?.toLowerCase().includes(lostPet.location?.toLowerCase());
      return nameMatch || locationMatch;
    });
    setMatches(potentialMatches);
    setShowPopup(true);
  };

  const markAsReunited = async (id) => {
    try {
      const res = await fetch(`/api/report/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reunited: true })
      });
      const updatedReports = reports.map(r =>
        r._id === id ? { ...r, reunited: true } : r
      );
      setReports(updatedReports);
      setReunitedPets(prev => [...prev, reports.find(r => r._id === id)]);
    } catch (error) {
      console.error('Failed to mark as reunited', error);
    }
  };

  const handleShare = (report) => {
    const text = `Lost Pet Alert 🚨\nName: ${report.petName}\nType: ${report.petType}\nLocation: ${report.location}\nContact: ${report.contact}`;
    navigator.clipboard.writeText(text);
    alert('Pet info copied to clipboard! Share it anywhere 📲');
  };

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch('/api/report');
      const data = await res.json();
      setReports(data);
      const reunited = data.filter(r => r.reunited);
      setReunitedPets(reunited);
    };
    fetchReports();
  }, []);

  const filterBySearch = (r) => (
    r.petName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterByType = (r) => (
    filterType === 'All' || r.petType === filterType
  );

  const filteredLostPets = reports.filter(r =>
    r.type === 'Lost' && !r.reunited && filterBySearch(r) && filterByType(r)
  );

  const filteredFoundPets = reports.filter(r =>
    r.type === 'Found' && !r.reunited && filterBySearch(r) && filterByType(r)
  );

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const PetCard = ({ report, showMatchButton }) => (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition flex flex-col md:flex-row gap-4">
      {report.previewUrl && (
        <img
          src={report.previewUrl}
          alt="Pet"
          className="rounded-xl object-cover w-full md:w-48 h-60"
        />
      )}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">{report.petName || 'Unnamed Pet'}</h2>
        <p className="text-sm text-pink-600 font-medium">{report.type}</p>
        <p className="text-sm text-gray-500">Type: {report.petType}</p>
        <p className="mt-2 text-gray-700 text-sm">{report.description}</p>
        <p className="text-sm text-gray-600 mt-1">📍 {report.location}</p>
        <p className="text-sm text-gray-600">📞 {report.contact}</p>
        <p className="text-xs text-gray-400 mt-1">📅 {new Date(report.createdAt).toLocaleString()}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {showMatchButton && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600"
              onClick={() => handleMatchClick(report)}
            >
              Find Matches
            </button>
          )}
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-xl hover:bg-gray-400"
            onClick={() => markAsReunited(report._id)}
          >
            Mark as Reunited
          </button>
          <button
            onClick={() => handleShare(report)}
            className="bg-blue-500 text-white py-2 px-3 rounded-xl hover:bg-blue-600 flex items-center gap-1"
          >
            <FaShareAlt /> Share
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-pink-700 shadow-sm">
        🐾 Browse Reported Pets
      </h1>

      <div className="max-w-4xl mx-auto mb-8 grid md:grid-cols-2 gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search by name or location..."
          className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow text-black"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow text-black"
        >
          <option value="All">All Types</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Birds">Birds</option>
          <option value="Panda">Panda</option>
        </select>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl">
            <h2 className="text-xl font-bold text-pink-600 mb-4">🔍 Possible Matches</h2>
            {matches.length === 0 ? (
              <p className="text-gray-600">No matches found.</p>
            ) : (
              matches.map((pet, i) => (
                <div key={i} className="border-t pt-4 mt-2">
                  {pet.previewUrl && (
                    <img
                      src={pet.previewUrl}
                      alt="Found Pet"
                      className="rounded-lg w-full h-40 object-cover mb-2"
                    />
                  )}
                  <p className="font-semibold text-gray-800">Name: {pet.petName}</p>
                  <p className="text-sm text-gray-700">Type: {pet.petType}</p>
                  <p className="text-sm text-gray-700">Location: {pet.location}</p>
                  <p className="text-sm text-gray-700">Contact: {pet.contact}</p>
                </div>
              ))
            )}
            <button
              className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b pb-2">🐶 Lost Pets</h2>
          <div className="grid gap-6">
            {filteredLostPets.slice(0, visibleCount).map((report, index) => (
              <PetCard key={index} report={report} showMatchButton={true} />
            ))}
            {filteredLostPets.length > visibleCount && (
              <button
                onClick={loadMore}
                className="bg-purple-500 text-white mt-4 py-2 px-4 rounded-xl mx-auto"
              >
                Load More Lost Pets
              </button>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-600 border-b pb-2">🐕 Found Pets</h2>
          <div className="grid gap-6">
            {filteredFoundPets.slice(0, visibleCount).map((report, index) => (
              <PetCard key={index} report={report} showMatchButton={false} />
            ))}
            {filteredFoundPets.length > visibleCount && (
              <button
                onClick={loadMore}
                className="bg-purple-500 text-white mt-4 py-2 px-4 rounded-xl mx-auto"
              >
                Load More Found Pets
              </button>
            )}
          </div>
        </div>
      </div>

      {reunitedPets.length > 0 && (
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-purple-600 border-b pb-2">🎉 Reunited Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {reunitedPets.map((pet, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
                {pet.previewUrl && (
                  <img src={pet.previewUrl} alt="Pet" className="w-full h-40 object-cover" />
                )}
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-700">{pet.petName}</p>
                  <p className="text-xs text-gray-500">{pet.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
