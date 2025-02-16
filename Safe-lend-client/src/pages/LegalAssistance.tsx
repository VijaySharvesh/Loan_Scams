import React from 'react';
import { Phone, Mail, FileText, Users, ArrowRight } from 'lucide-react';

export function LegalAssistance() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Assistance Center</h1>
        <p className="text-xl text-gray-600">
          Get help if you've been a victim of loan fraud
        </p>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">
          Immediate Assistance
        </h2>
        <div className="flex items-center space-x-4 text-red-700">
          <Phone className="h-5 w-5" />
          <span className="font-medium">Emergency Helpline: 1800-XXX-XXXX</span>
        </div>
      </div>

      {/* Steps to Take */}
      <div className="bg-white border rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Steps to Take
        </h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                File a Police Complaint
              </h3>
              <p className="text-gray-600">
                Visit your nearest police station or file an online FIR. Keep all documentation and communication records ready.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Report to RBI
              </h3>
              <p className="text-gray-600">
                Submit a detailed complaint to RBI's Consumer Education and Protection Cell.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Seek Legal Counsel
              </h3>
              <p className="text-gray-600">
                Connect with our network of legal experts specializing in financial fraud cases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <Phone className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">
            Speak directly with our legal support team
          </p>
          <a href="tel:1800XXXXXX" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
            Call Now <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <Mail className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">
            Send us your case details for review
          </p>
          <a href="mailto:legal@safelend.com" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
            Email Us <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <FileText className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Document Review</h3>
          <p className="text-gray-600 mb-4">
            Get your loan documents reviewed by experts
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
            Upload Documents <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Support Groups */}
      <div className="bg-white border rounded-lg p-8">
        <div className="flex items-center space-x-4 mb-6">
          <Users className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Support Groups
          </h2>
        </div>
        <p className="text-gray-600 mb-6">
          Join our support groups to connect with other victims and share experiences. Our community provides emotional support and practical advice.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Join Support Group
        </button>
      </div>
    </div>
  );
}