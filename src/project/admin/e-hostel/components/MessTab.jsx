import React, { useState } from 'react';

export default function MessTab() {
  // 1. Published Weekly Menu State
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [weeklyMenu, setWeeklyMenu] = useState({
    Monday: { breakfast: 'Idli Sambar, Chutney, Tea', lunch: 'Rice, Dal Fry, Seasonal Veg, Curd', dinner: 'Roti, Mixed Veg Curry, Egg Curry / Paneer' },
    Tuesday: { breakfast: 'Aloo Paratha, Curd, Pickle, Tea', lunch: 'Veg Biryani, Raita, Salad, Papad', dinner: 'Roti, Dal Tadka, Bhindi Masala, Sweet' },
    Wednesday: { breakfast: 'Poha, Sev, Sprouts, Banana, Coffee', lunch: 'Rice, Rajma Masala, Jeera Aloo, Raita', dinner: 'Roti, Kadhi Pakora, Gobi Mutter, Fruit' },
    Thursday: { breakfast: 'Bread Toast, Omelette / Butter, Juice', lunch: 'Rice, Dal Makhani, Paneer Butter Masala', dinner: 'Roti, Chana Masala, Lauki Kofta, Kheer' },
    Friday: { breakfast: 'Vada Sambar, Coconut Chutney, Tea', lunch: 'Rice, Sambhar, Cabbage Thoran, Rasam', dinner: 'Roti, Dal Fry, Chicken Curry / Shahi Paneer' },
    Saturday: { breakfast: 'Veg Cutlet, Toast, Green Chutney, Coffee', lunch: 'Rice, Chole Bhature, Onion Salad, Pickle', dinner: 'Roti, Mixed Dal, Aloo Gobi Dry, Ice Cream' },
    Sunday: { breakfast: 'Masala Dosa, Sambar, Coffee', lunch: 'Veg Pulao, Paneer Lababdar, Dal Tadka', dinner: 'Roti, Egg Bhurji / Soya chunks, Custard' }
  });

  const [editMealType, setEditMealType] = useState(null); // 'breakfast', 'lunch', 'dinner'
  const [editValue, setEditValue] = useState('');

  const handleSaveMenu = (meal) => {
    setWeeklyMenu(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [meal]: editValue
      }
    }));
    setEditMealType(null);
  };

  // 2. Trainees Meal Plan Selection & Billing
  const [traineePlans, setTraineePlans] = useState([
    { id: 1, name: 'Rahul Verma', plan: 'Standard Veg', status: 'Active', billingCycle: 'Monthly', fee: '₹ 4,500' },
    { id: 2, name: 'Anjali Singh', plan: 'Premium Non-Veg', status: 'Active', billingCycle: 'Monthly', fee: '₹ 5,800' },
    { id: 3, name: 'Meera Nair', plan: 'Special Diet (Low Sodium)', status: 'Active', billingCycle: 'Monthly', fee: '₹ 5,200' },
    { id: 4, name: 'Arun Patel', plan: 'Standard Veg', status: 'Suspended', billingCycle: 'Weekly', fee: '₹ 1,200' }
  ]);

  const [newTraineePlan, setNewTraineePlan] = useState({ name: '', plan: 'Standard Veg', billingCycle: 'Monthly' });

  const getPlanFee = (plan, cycle) => {
    let base = 4500;
    if (plan === 'Premium Non-Veg') base = 5800;
    if (plan === 'Special Diet (Low Sodium)') base = 5200;
    if (cycle === 'Weekly') base = Math.round(base / 4);
    return `₹ ${base.toLocaleString('en-IN')}`;
  };

  const handleAddTraineePlan = (e) => {
    e.preventDefault();
    if (!newTraineePlan.name) return;
    const fee = getPlanFee(newTraineePlan.plan, newTraineePlan.billingCycle);
    setTraineePlans([
      ...traineePlans,
      {
        id: Date.now(),
        name: newTraineePlan.name,
        plan: newTraineePlan.plan,
        status: 'Active',
        billingCycle: newTraineePlan.billingCycle,
        fee
      }
    ]);
    setNewTraineePlan({ name: '', plan: 'Standard Veg', billingCycle: 'Monthly' });
  };

  // 3. Canteen Feedback Log
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, author: 'Vikram Das', rating: 5, date: '30 May 2025', comment: 'Loved the Veg Biryani on Tuesday! Excellent quality.' },
    { id: 2, author: 'Anjali Singh', rating: 4, date: '29 May 2025', comment: 'Paneer Butter Masala was great, but Roti was a bit cold.' },
    { id: 3, author: 'Arun Patel', rating: 3, date: '28 May 2025', comment: 'Breakfast poha was dry. Sambar was good though.' }
  ]);

  const [newFeedback, setNewFeedback] = useState({ author: '', rating: 5, comment: '' });

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.author || !newFeedback.comment) return;
    setFeedbackList([
      {
        id: Date.now(),
        author: newFeedback.author,
        rating: parseInt(newFeedback.rating),
        date: 'Today',
        comment: newFeedback.comment
      },
      ...feedbackList
    ]);
    setNewFeedback({ author: '', rating: 5, comment: '' });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-700 font-sans">
      
      {/* Canteen Header */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Mess & Dining Management Console</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Publish weekly menu plans, manage trainee subscriptions, collect culinary feedback, and track mess billing logs.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-xl text-center shadow-3xs">
            <span className="text-[10px] font-bold uppercase tracking-wider block">Average Mess Rating</span>
            <span className="text-lg font-black font-mono">4.2 / 5.0 ★</span>
          </div>
        </div>
      </div>

      {/* Row 1: Menu Publishing & Canteen Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Weekly Menu Planner */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col justify-between space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-800">Weekly Menu Publisher</h3>
            <p className="text-xs text-slate-500 font-medium">Click on any day to review and publish updated catering plans.</p>
          </div>

          {/* Days of Week Tab row */}
          <div className="flex flex-wrap gap-1.5 py-1">
            {Object.keys(weeklyMenu).map((day) => (
              <button
                key={day}
                onClick={() => { setSelectedDay(day); setEditMealType(null); }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-150 cursor-pointer ${
                  selectedDay === day
                    ? 'bg-[#08493d] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {day.substring(0, 3)}
              </button>
            ))}
          </div>

          {/* Day Meal Details Panel */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-4.5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black uppercase text-[#08493d] tracking-wider">{selectedDay}'s Culinary Layout</h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">Active Plan</span>
            </div>

            {/* Breakfast / Lunch / Dinner list */}
            {['breakfast', 'lunch', 'dinner'].map((meal) => {
              const isEditing = editMealType === meal;
              return (
                <div key={meal} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-white border border-slate-150 rounded-xl gap-2 shadow-3xs">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                      {meal[0]}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none">{meal}</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="mt-1 px-2.5 py-1.5 border border-gray-300 rounded text-xs font-semibold w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <p className="text-xs font-extrabold text-slate-800 mt-1">{weeklyMenu[selectedDay][meal]}</p>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 self-end sm:self-center">
                    {isEditing ? (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleSaveMenu(meal)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase rounded cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditMealType(null)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] uppercase rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditMealType(meal); setEditValue(weeklyMenu[selectedDay][meal]); }}
                        className="text-emerald-700 hover:text-emerald-900 text-[10px] font-black uppercase hover:underline cursor-pointer"
                      >
                        Publish/Edit
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col justify-between space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-800">Trainee Culinary Feedback</h3>
            <p className="text-xs text-slate-500 font-medium">View and record culinary comments regarding menu quality.</p>
          </div>

          {/* Feedback Queue */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {feedbackList.map((fb) => (
              <div key={fb.id} className="p-3 bg-slate-50/50 border border-slate-150/40 rounded-xl text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-slate-800">{fb.author}</span>
                  <div className="flex items-center gap-1.5 text-orange-500 font-bold">
                    <span>{'★'.repeat(fb.rating)}</span>
                    <span className="text-[10px] text-slate-400 font-medium font-mono">{fb.date}</span>
                  </div>
                </div>
                <p className="text-slate-500 leading-relaxed font-semibold">{fb.comment}</p>
              </div>
            ))}
          </div>

          {/* Add Feedback Simulation form */}
          <form onSubmit={handleAddFeedback} className="bg-slate-50 p-4 rounded-xl space-y-3">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Leave Canteen Review (Simulation)</h4>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Trainee Name"
                value={newFeedback.author}
                onChange={(e) => setNewFeedback({ ...newFeedback, author: e.target.value })}
                className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <select
                value={newFeedback.rating}
                onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
                className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800"
              >
                <option value="5">5 Stars Excellent</option>
                <option value="4">4 Stars Good</option>
                <option value="3">3 Stars Average</option>
                <option value="2">2 Stars Poor</option>
                <option value="1">1 Star Terrible</option>
              </select>
            </div>
            <textarea
              required
              rows="1.5"
              placeholder="Provide comments about meal quality..."
              value={newFeedback.comment}
              onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase rounded-lg shadow-sm cursor-pointer"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Row 2: Meal Plan Selection & Mess Billing Logs */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-3 mb-2 gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-800">Meal Plan Registration & Mess Billing</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Subscribe trainee officers to active mess meal programs and manage cycle invoices.</p>
          </div>
          <form onSubmit={handleAddTraineePlan} className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
            <input
              type="text"
              required
              placeholder="Trainee Name"
              value={newTraineePlan.name}
              onChange={(e) => setNewTraineePlan({ ...newTraineePlan, name: e.target.value })}
              className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800"
            />
            <select
              value={newTraineePlan.plan}
              onChange={(e) => setNewTraineePlan({ ...newTraineePlan, plan: e.target.value })}
              className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800"
            >
              <option value="Standard Veg">Standard Veg</option>
              <option value="Premium Non-Veg">Premium Non-Veg</option>
              <option value="Special Diet (Low Sodium)">Special Diet (Low Sodium)</option>
            </select>
            <select
              value={newTraineePlan.billingCycle}
              onChange={(e) => setNewTraineePlan({ ...newTraineePlan, billingCycle: e.target.value })}
              className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800"
            >
              <option value="Monthly">Monthly Cycle</option>
              <option value="Weekly">Weekly Cycle</option>
            </select>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold text-xs rounded-lg shadow-sm hover:shadow cursor-pointer whitespace-nowrap"
            >
              + Subscribe Plan
            </button>
          </form>
        </div>

        {/* Plan Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase tracking-wider">
                <th className="px-4 py-3">Trainee Name</th>
                <th className="px-4 py-3">Meal Subscription Plan</th>
                <th className="px-4 py-3">Billing Cycle</th>
                <th className="px-4 py-3 font-mono">Invoice Dues</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {traineePlans.map((tp) => (
                <tr key={tp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 font-extrabold text-slate-800">{tp.name}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      tp.plan === 'Premium Non-Veg' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      tp.plan === 'Standard Veg' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      'bg-indigo-50 text-indigo-800 border border-indigo-200'
                    }`}>{tp.plan}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 font-bold">{tp.billingCycle}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-800 font-extrabold">{tp.fee}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      tp.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>{tp.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => setTraineePlans(traineePlans.map(p => p.id === tp.id ? { ...p, status: p.status === 'Active' ? 'Suspended' : 'Active' } : p))}
                      className={`text-[10px] font-black uppercase hover:underline cursor-pointer ${
                        tp.status === 'Active' ? 'text-rose-600 hover:text-rose-800' : 'text-emerald-700 hover:text-emerald-900'
                      }`}
                    >
                      {tp.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
