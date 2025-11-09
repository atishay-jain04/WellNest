import React, { useState } from 'react';
import { IoCheckmarkCircle, IoEllipseOutline, IoTrashOutline, IoCreateOutline } from 'react-icons/io5';
import { BsCircleFill } from 'react-icons/bs';

/**
 * TodoItem Component
 * Renders a single todo task with category, priority, and due date
 * Supports editing, deletion, and completion toggle
 */
const TodoItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  // Category colors
  const categoryColors = {
    Work: 'bg-blue-500',
    Personal: 'bg-purple-500',
    Wellness: 'bg-green-500'
  };

  // Priority icons and colors
  const priorityConfig = {
    High: { color: 'text-red-500', label: 'High' },
    Medium: { color: 'text-yellow-500', label: 'Med' },
    Low: { color: 'text-green-500', label: 'Low' }
  };

  // Check if task is overdue or due today
  const isOverdueOrToday = () => {
    if (!task.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due <= today;
  };

  const handleSave = () => {
    onEdit(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (taskDate < today) {
      return 'Overdue';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border-2 ${
        isOverdueOrToday() && !task.completed
          ? 'border-red-200 bg-red-50/30'
          : 'border-gray-100 hover:border-gray-200'
      } ${task.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0 mt-0.5 transition-all duration-300 hover:scale-110"
        >
          {task.completed ? (
            <IoCheckmarkCircle className="text-3xl text-green-500" />
          ) : (
            <IoEllipseOutline className="text-3xl text-gray-400 hover:text-green-500" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            // Edit Mode
            <div className="space-y-3">
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none font-medium"
                placeholder="Task title"
              />

              <div className="flex flex-wrap gap-2">
                {/* Category Select */}
                <select
                  value={editedTask.category}
                  onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none text-sm"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Wellness">Wellness</option>
                </select>

                {/* Priority Select */}
                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none text-sm"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>

                {/* Due Date */}
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none text-sm"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <>
              <h3 className={`text-base font-medium text-gray-800 mb-2 ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                {/* Category Badge */}
                <span className={`px-3 py-1 rounded-full text-white font-medium ${categoryColors[task.category]}`}>
                  {task.category}
                </span>

                {/* Priority Badge */}
                <span className={`px-3 py-1 rounded-full font-medium ${
                  task.priority === 'High' ? 'bg-red-100 text-red-700' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {priorityConfig[task.priority].label}
                </span>

                {/* Due Date */}
                {task.dueDate && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isOverdueOrToday() && !task.completed
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {formatDate(task.dueDate)}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit task"
            >
              <IoCreateOutline className="text-xl" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete task"
            >
              <IoTrashOutline className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
