import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

function App() {
  const API_URL = "http://localhost:5001/api/tasks";

  const emptyForm = {
    title: "",
    description: "",
    project: "",
    assignedEmployee: "",
    priority: "Medium",
    dueDate: "",
    status: "To Do",
  };

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  // Get authentication token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const token = getToken();

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      } else {
        alert(data.message || "Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Unable to connect to the backend server.");
    }
  };

 useEffect(() => {
  fetchTasks();
  fetchProjectsAndEmployees();
}, []);
  const fetchProjectsAndEmployees = async () => {
  try {
    const token = getToken();

    const [projectsResponse, employeesResponse] = await Promise.all([
      fetch("http://localhost:5001/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      fetch("http://localhost:5001/api/auth/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const projectsData = await projectsResponse.json();
    const employeesData = await employeesResponse.json();

    if (projectsResponse.ok) {
      setProjects(projectsData.projects);
    } else {
      alert(projectsData.message || "Failed to fetch projects.");
    }

    if (employeesResponse.ok) {
      setEmployees(employeesData.employees);
    } else {
      alert(employeesData.message || "Failed to fetch employees.");
    }
  } catch (error) {
    console.error("Error fetching projects and employees:", error);
    alert("Unable to load projects and employees.");
  }
};

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();

      const url = editingTask
        ? `${API_URL}/${editingTask._id}`
        : API_URL;

      const method = editingTask ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          editingTask
            ? "Task updated successfully."
            : "Task created successfully."
        );

        setFormData(emptyForm);
        setEditingTask(null);
        fetchTasks();
      } else {
        alert(data.message || "Operation failed.");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Unable to connect to the backend server.");
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditingTask(task);

    setFormData({
      title: task.title,
      description: task.description,
      project: task.project?._id || "",
      assignedEmployee: task.assignedEmployee?._id || "",
      priority: task.priority,
      dueDate: task.dueDate
        ? task.dueDate.substring(0, 10)
        : "",
      status: task.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingTask(null);
    setFormData(emptyForm);
  };

  // Delete task
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Task deleted successfully.");
        fetchTasks();
      } else {
        alert(data.message || "Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Unable to connect to the backend server.");
    }
  };

  // Filter tasks on frontend
  const filteredTasks = tasks
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter(
    (task) =>
      !projectFilter ||
      task.project?._id === projectFilter
  )
  .filter(
    (task) =>
      !employeeFilter ||
      task.assignedEmployee?._id === employeeFilter
  )
  .filter(
    (task) =>
      !priorityFilter ||
      task.priority === priorityFilter
  )
  .filter(
    (task) =>
      !statusFilter ||
      task.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Task Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage tasks, assign employees, and track progress
          </p>
        </div>
        {/* Task Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* Total Tasks */}
            <div className="bg-white rounded-xl shadow p-5">
             <p className="text-sm text-gray-500">
               Total Tasks
             </p>

               <h2 className="text-3xl font-bold text-gray-800 mt-2">
               {tasks.length}
               </h2>
               </div>

                {/* To Do */}
               <div className="bg-white rounded-xl shadow p-5">
                <p className="text-sm text-gray-500">
                To Do
                 </p>

                 <h2 className="text-3xl font-bold text-gray-800 mt-2">
                 {tasks.filter((task) => task.status === "To Do").length}
                 </h2>
                </div>

                   {/* In Progress */}
                 <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-sm text-gray-500">
                   In Progress
                   </p>

                      <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {tasks.filter(
                  (task) => task.status === "In Progress"
                   ).length}
                   </h2>
                    </div>

                    {/* Review */}
                  <div className="bg-white rounded-xl shadow p-5">
                   <p className="text-sm text-gray-500">
                     Review
                      </p>

                     <h2 className="text-3xl font-bold text-gray-800 mt-2">
                       {tasks.filter(
                        (task) => task.status === "Review"
                       ).length}
                       </h2>
                      </div>

                    {/* Completed */}
                   <div className="bg-white rounded-xl shadow p-5">
                   <p className="text-sm text-gray-500">
                     Completed
                   </p>

                   <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {tasks.filter(
                    (task) => task.status === "Completed"
                    ).length}
                    </h2>
                </div>

                  </div>

           {/* Task Form */}
           <TaskForm
               formData={formData}
               handleChange={handleChange}
               handleSubmit={handleSubmit}
               isEditing={Boolean(editingTask)}
               handleCancel={handleCancel}
               projects={projects}
               employees={employees}
          />

        {/* Filters */}
        <TaskFilters
          search={search}
          setSearch={setSearch}
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
          employeeFilter={employeeFilter}
          setEmployeeFilter={setEmployeeFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          projects={projects}
          employees={employees}
        />

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </div>
  );
}

export default App;