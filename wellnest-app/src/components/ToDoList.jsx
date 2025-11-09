import React, { useState, useEffect } from 'react';
import { IoAddCircle, IoFilter } from 'react-icons/io5';
import { TbCheckbox } from 'react-icons/tb';
import TodoItem from './TodoItem';
import ProgressBar from './ProgressBar';
import QuoteModal from './QuoteModal';

/**
 * TodoList Component - Main To-Do List Tab
 * Features:
 * - Task categories (Work, Personal, Wellness)
 * - Priority levels (High, Medium, Low) with smart sorting
 * - Due dates with overdue highlighting
 * - Progress tracking with visual progress bar
 * - Animated task completion with toast notifications
 * - Daily reflection modal when all tasks complete
 * - Session storage persistence
 */
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Personal',
    priority: 'Medium',
    dueDate: '',
    completed: false
  });
  const [filter, setFilter] = useState('all'); // all, work, personal, wellness
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load tasks from session storage on mount
  useEffect(() => {
    const savedTasks = sessionStorage.getItem('wellnest_tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Save tasks to session storage whenever they change
  useEffect(() => {
    if (tasks.length >= 0) {
      sessionStorage.setItem('wellnest_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Check if all tasks are completed and show modal
  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.completed)) {
      setTimeout(() => setShowQuoteModal(true), 500);
    }
  }, [tasks]);

  // Add new task
  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;

    const task = {
      id: Date.now(),
      ...newTask,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      category: 'Personal',
      priority: 'Medium',
      dueDate: '',
      completed: false
    });

    showToastMessage('Task added successfully! 🌿');
  };

  // Toggle task completion with animation
  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          if (newCompleted) {
            showToastMessage('Great job! 🌿');
          }
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    showToastMessage('Task removed 🗑️');
  };

  // Edit task
  const handleEditTask = (taskId, updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    showToastMessage('Task updated! ✏️');
  };

  // Show toast notification
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Sort tasks by priority (High > Medium > Low) and completion status
  const getSortedTasks = (taskList) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return [...taskList].sort((a, b) => {
      // Incomplete tasks first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then by priority
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  // Filter tasks by category
  const getFilteredTasks = () => {
    let filtered = tasks;
    if (filter !== 'all') {
      filtered = tasks.filter(task =>
        task.category.toLowerCase() === filter.toLowerCase()
      );
    }
    return getSortedTasks(filtered);
  };

  // Calculate progress
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <TbCheckbox className="text-4xl text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">Daily Tasks</h1>
        </div>
        <p className="text-gray-600 ml-12">
          Organize your day, one task at a time
        </p>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        {tasks.length > 0 && (
          <ProgressBar completed={completedCount} total={totalCount} />
        )}

        {/* Add New Task Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>

          <div className="space-y-4">
            {/* Task Title Input */}
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors text-lg"
            />

            {/* Task Options */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Category Select */}
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Wellness">Wellness</option>
              </select>

              {/* Priority Select */}
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              {/* Due Date Input */}
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors text-gray-700 cursor-pointer"
                style={{
                  colorScheme: 'light'
                }}
              />

              {/* Add Button */}
              <button
                onClick={handleAddTask}
                disabled={!newTask.title.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <IoAddCircle className="text-xl" />
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        {tasks.length > 0 && (
          <div className="flex items-center gap-3 px-2">
            <IoFilter className="text-2xl text-gray-500" />
            <div className="flex gap-2">
              {['all', 'work', 'personal', 'wellness'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filter === f
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-3">
          {getFilteredTasks().length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks in this category'}
              </h3>
              <p className="text-gray-500">
                {tasks.length === 0
                  ? 'Start by adding your first task above'
                  : 'Try a different filter or add a new task'}
              </p>
            </div>
          ) : (
            getFilteredTasks().map((task) => (
              <div
                key={task.id}
                className={`transform transition-all duration-500 ${
                  task.completed ? 'animate-fadeOut' : 'animate-fadeIn'
                }`}
              >
                <TodoItem
                  task={task}
                  onToggle={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              </div>
            ))
          )}
        </div>

        {/* Stats Footer */}
        {tasks.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-800">{totalCount}</div>
                <div className="text-sm text-gray-500 mt-1">Total Tasks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-500 mt-1">Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{totalCount - completedCount}</div>
                <div className="text-sm text-gray-500 mt-1">Remaining</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quote Modal - Shown when all tasks complete */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-100 animate-slideUp z-50">
          <p className="text-gray-800 font-medium flex items-center gap-2">
            {toastMessage}
          </p>
        </div>
      )}

      {/* Custom Animations Styles - Add to global CSS or Tailwind config */}
      <style jsx={true}>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0.6;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .delay-75 {
          animation-delay: 75ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        /* Date input calendar styling */
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
          filter: invert(0.5);
        }

        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          filter: invert(0.3) sepia(1) saturate(5) hue-rotate(90deg);
        }

        input[type="date"]::-webkit-datetime-edit-fields-wrapper {
          padding: 0;
        }

        input[type="date"]::-webkit-datetime-edit-text {
          color: #6b7280;
          padding: 0 0.25rem;
        }

        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field {
          color: #374151;
        }

        input[type="date"]:focus::-webkit-datetime-edit-month-field,
        input[type="date"]:focus::-webkit-datetime-edit-day-field,
        input[type="date"]:focus::-webkit-datetime-edit-year-field {
          color: #10b981;
        }
      `}</style>
    </div>
  );
};

export default ToDoList;
