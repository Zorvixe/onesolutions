// pages/admin/Reports.jsx
import React from "react";
import { FileText, BarChart3, Download, TrendingUp } from "lucide-react";

const Reports = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">
              Generate and view detailed reports
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Download size={18} />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
        <FileText size={64} className="mx-auto text-gray-400 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Reports Dashboard Coming Soon
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          We're working hard to bring you comprehensive reporting features. This
          section will include detailed analytics, export options, and custom
          report generation.
        </p>
        <div className="mt-8 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="text-indigo-600" size={20} />
            <span className="text-gray-700">Analytics Dashboard</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-gray-700">Trend Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
