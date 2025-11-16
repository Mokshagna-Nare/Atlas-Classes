import React, { useState } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { Institute } from '../../../../types';
import EditInstituteModal from './EditInstituteModal';
import AddInstituteModal from './AddInstituteModal';

const ManageInstitutes: React.FC = () => {
  const { institutes, deleteInstitute } = useData();
  const [editingInstitute, setEditingInstitute] = useState<Institute | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (institute: Institute) => {
    setEditingInstitute(institute);
  };
  
  const handleCloseModal = () => {
    setEditingInstitute(null);
  };
  
  const handleDelete = (instituteId: string) => {
    if (window.confirm('Are you sure you want to delete this institute? This action cannot be undone.')) {
        deleteInstitute(instituteId);
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-atlas-orange">Manage Institutes</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-atlas-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition"
        >
          Add New Institute
        </button>
      </div>
      <div className="overflow-x-auto bg-atlas-black rounded-lg">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {institutes.map(institute => (
              <tr key={institute.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="p-4 text-gray-400">{institute.id}</td>
                <td className="p-4">{institute.name}</td>
                <td className="p-4">{institute.email}</td>
                <td className="p-4">
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleEdit(institute)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(institute.id)}
                      className="text-red-500 hover:text-red-400 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingInstitute && (
        <EditInstituteModal
          institute={editingInstitute}
          onClose={handleCloseModal}
        />
      )}
      {isAddModalOpen && (
        <AddInstituteModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
};

export default ManageInstitutes;