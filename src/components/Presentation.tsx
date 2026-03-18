import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight, MapPin, QrCode, Building, Users, Navigation, Smartphone } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  type: 'title' | 'content' | 'feature' | 'mockup' | 'technical';
  content: React.ReactNode;
}

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    // Title Slide
    {
      id: 1,
      title: "MapMyCampus",
      type: "title",
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-[#004080] rounded-2xl flex items-center justify-center">
              <div className="text-4xl text-white">🏛️</div>
            </div>
          </div>
          <div>
            <h1 className="text-5xl text-[#004080] mb-4">MapMyCampus</h1>
            <h2 className="text-2xl text-[#4A90E2] mb-6">QR-Enhanced Campus Navigation System</h2>
            <p className="text-xl text-gray-600">Modern Indoor Navigation for Smart Campuses</p>
          </div>
          <div className="flex justify-center space-x-8 text-[#004080]">
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6" />
              <span>Indoor Navigation</span>
            </div>
            <div className="flex items-center space-x-2">
              <QrCode className="w-6 h-6" />
              <span>QR Integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Smartphone className="w-6 h-6" />
              <span>Mobile Responsive</span>
            </div>
          </div>
        </div>
      )
    },
    
    // Problem Statement
    {
      id: 2,
      title: "The Challenge",
      type: "content",
      content: (
        <div className="space-y-8">
          <h2 className="text-4xl text-[#004080] text-center mb-8">Campus Navigation Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 border-l-4 border-l-red-500">
              <h3 className="text-xl text-red-600 mb-4">Current Problems</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Students get lost in large campus buildings</li>
                <li>• Difficulty finding specific rooms and laboratories</li>
                <li>• No real-time room availability information</li>
                <li>• Time wasted searching for locations</li>
                <li>• Poor accessibility for new students</li>
              </ul>
            </Card>
            <Card className="p-6 border-l-4 border-l-[#4A90E2]">
              <h3 className="text-xl text-[#4A90E2] mb-4">Our Solution</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Interactive indoor floor maps</li>
                <li>• QR code-based room identification</li>
                <li>• Real-time room status and information</li>
                <li>• Turn-by-turn navigation guidance</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </Card>
          </div>
        </div>
      )
    },

    // Key Features
    {
      id: 3,
      title: "Key Features",
      type: "feature",
      content: (
        <div className="space-y-8">
          <h2 className="text-4xl text-[#004080] text-center mb-8">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#4A90E2]" />
              </div>
              <h3 className="text-xl text-[#004080] mb-3">Interactive Maps</h3>
              <p className="text-gray-600">Clickable floor plans with real-time room status indicators and detailed information panels.</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-[#4A90E2]" />
              </div>
              <h3 className="text-xl text-[#004080] mb-3">QR Code Integration</h3>
              <p className="text-gray-600">Scan QR codes outside rooms to instantly view location details and get directions.</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#4A90E2]" />
              </div>
              <h3 className="text-xl text-[#004080] mb-3">Room Information</h3>
              <p className="text-gray-600">Comprehensive room details including capacity, amenities, schedules, and contact information.</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-8 h-8 text-[#4A90E2]" />
              </div>
              <h3 className="text-xl text-[#004080] mb-3">Turn-by-Turn Directions</h3>
              <p className="text-gray-600">Step-by-step navigation guidance from any starting point to your destination.</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-[#4A90E2]" />
              </div>
              <h3 className="text-xl text-[#004080] mb-3">Multi-Floor Support</h3>
              <p className="text-gray-600">Seamless navigation across multiple floors with floor selection and level indicators.</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-[#4A90E2]" />
              </div>
              <h3 className="text-xl text-[#004080] mb-3">Mobile Responsive</h3>
              <p className="text-gray-600">Optimized for all devices with touch-friendly interface and progressive web app support.</p>
            </Card>
          </div>
        </div>
      )
    },

    // Login Screen Mockup
    {
      id: 4,
      title: "Login Interface",
      type: "mockup",
      content: (
        <div className="space-y-8">
          <h2 className="text-4xl text-[#004080] text-center mb-8">Clean Authentication</h2>
          <div className="flex justify-center">
            <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Mock Login Screen */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-[#004080] rounded-xl flex items-center justify-center mx-auto">
                    <div className="text-white">🏛️</div>
                  </div>
                  <div>
                    <h3 className="text-2xl text-[#004080]">MapMyCampus</h3>
                    <p className="text-sm text-[#4A90E2]">Navigation System</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-10 bg-gray-100 rounded-xl"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-10 bg-gray-100 rounded-xl"></div>
                </div>
                <div className="h-12 bg-[#004080] rounded-xl"></div>
                <div className="text-center">
                  <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-[#004080]">Secure User Authentication</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Clean, modern login interface with campus branding and secure authentication flow for students, faculty, and staff.</p>
          </div>
        </div>
      )
    },

    // Dashboard Overview
    {
      id: 5,
      title: "Dashboard Interface",
      type: "mockup",
      content: (
        <div className="space-y-8">
          <h2 className="text-4xl text-[#004080] text-center mb-8">Interactive Dashboard</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Mock Dashboard */}
            <div className="bg-white border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#004080] rounded"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-2 bg-gray-100 rounded w-16 mt-1"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-8 bg-gray-100 rounded-full w-64"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex h-96">
              <div className="flex-1 p-4">
                {/* Mock Map Area */}
                <div className="h-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 text-[#4A90E2] mx-auto" />
                    <p className="text-[#004080]">Interactive Floor Map</p>
                    <p className="text-sm text-gray-500">Clickable rooms with real-time status</p>
                  </div>
                </div>
              </div>
              <div className="w-80 p-4">
                {/* Mock Info Panel */}
                <div className="h-full bg-white border rounded-xl p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                      <div className="h-5 bg-green-100 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-100 rounded w-32"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-full"></div>
                      <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-[#004080]">Split-Screen Layout</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Interactive map on the left with detailed information panel on the right. Users can click rooms to view schedules, capacity, and navigation details.</p>
          </div>
        </div>
      )
    },

    // Technical Architecture
    {
      id: 6,
      title: "Technical Architecture",
      type: "technical",
      content: (
        <div className="space-y-8">
          <h2 className="text-4xl text-[#004080] text-center mb-8">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-2xl text-[#004080] mb-6">Frontend Technologies</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>React 18</strong> - Modern UI framework with hooks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>TypeScript</strong> - Type-safe development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>Tailwind CSS v4</strong> - Utility-first styling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>Shadcn/ui</strong> - Accessible component library</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>Lucide React</strong> - Modern icon library</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-2xl text-[#004080] mb-6">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#4A90E2] rounded-full"></div>
                  <span><strong>Responsive Design</strong> - Mobile-first approach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#4A90E2] rounded-full"></div>
                  <span><strong>Interactive SVG Maps</strong> - Scalable floor plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#4A90E2] rounded-full"></div>
                  <span><strong>State Management</strong> - React hooks & context</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#4A90E2] rounded-full"></div>
                  <span><strong>QR Code Integration</strong> - Camera & upload support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#4A90E2] rounded-full"></div>
                  <span><strong>Progressive Web App</strong> - Offline capabilities</span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] rounded-xl p-8">
            <h3 className="text-2xl text-[#004080] mb-4 text-center">Architecture Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="text-[#004080] mb-2">Performance</h4>
                <p className="text-sm text-gray-700">Optimized rendering and lazy loading for smooth user experience</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🔧</div>
                <h4 className="text-[#004080] mb-2">Maintainable</h4>
                <p className="text-sm text-gray-700">Modular components and TypeScript for easier development</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h4 className="text-[#004080] mb-2">Scalable</h4>
                <p className="text-sm text-gray-700">Ready for multi-building and multi-campus expansion</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Future Roadmap
    {
      id: 7,
      title: "Future Roadmap",
      type: "content",
      content: (
        <div className="space-y-8">
          <h2 className="text-4xl text-[#004080] text-center mb-8">Development Roadmap</h2>
          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-l-green-500">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                <h3 className="text-xl text-green-600">Phase 1: MVP Complete</h3>
              </div>
              <ul className="text-gray-700 space-y-2 ml-12">
                <li>• Single floor indoor navigation</li>
                <li>• Basic room information system</li>
                <li>• QR code integration framework</li>
                <li>• Responsive web application</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-[#4A90E2]">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-sm">2</div>
                <h3 className="text-xl text-[#4A90E2]">Phase 2: Enhanced Features</h3>
              </div>
              <ul className="text-gray-700 space-y-2 ml-12">
                <li>• Real-time room occupancy sensors</li>
                <li>• Multi-floor navigation with elevators</li>
                <li>• Integration with campus calendar systems</li>
                <li>• Push notifications and alerts</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-orange-500">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">3</div>
                <h3 className="text-xl text-orange-600">Phase 3: Smart Campus</h3>
              </div>
              <ul className="text-gray-700 space-y-2 ml-12">
                <li>• Multi-building campus navigation</li>
                <li>• Indoor positioning system (IPS)</li>
                <li>• Accessibility features for disabled users</li>
                <li>• Analytics dashboard for facility management</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-purple-500">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">4</div>
                <h3 className="text-xl text-purple-600">Phase 4: AI Integration</h3>
              </div>
              <ul className="text-gray-700 space-y-2 ml-12">
                <li>• AI-powered route optimization</li>
                <li>• Predictive room availability</li>
                <li>• Voice navigation assistance</li>
                <li>• Personalized campus experience</li>
              </ul>
            </Card>
          </div>
        </div>
      )
    },

    // Benefits & Impact
    {
      id: 8,
      title: "Impact & Benefits",
      type: "content",
      content: (
        <div className="space-y-8">
          <h2 className="text-4xl text-[#004080] text-center mb-8">Project Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl text-[#004080]">For Students</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mt-0.5">✓</div>
                  <div>
                    <h4 className="text-lg">Reduced Navigation Time</h4>
                    <p className="text-gray-600">Save 15-20 minutes per day finding classrooms and facilities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mt-0.5">✓</div>
                  <div>
                    <h4 className="text-lg">Improved Campus Experience</h4>
                    <p className="text-gray-600">Less stress and anxiety about getting lost on campus</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mt-0.5">✓</div>
                  <div>
                    <h4 className="text-lg">Better Attendance</h4>
                    <p className="text-gray-600">Arrive on time to classes and appointments</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl text-[#004080]">For Faculty</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mt-0.5">✓</div>
                  <div>
                    <h4 className="text-lg">Room Management</h4>
                    <p className="text-gray-600">Easy access to room schedules and availability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mt-0.5">✓</div>
                  <div>
                    <h4 className="text-lg">Efficient Meetings</h4>
                    <p className="text-gray-600">Quick navigation to conference rooms and offices</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl text-[#004080]">For Administration</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mt-0.5">✓</div>
                  <div>
                    <h4 className="text-lg">Space Optimization</h4>
                    <p className="text-gray-600">Data-driven insights for facility utilization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mt-0.5">✓</div>
                  <div>
                    <h4 className="text-lg">Reduced Support Tickets</h4>
                    <p className="text-gray-600">Fewer "where is room X?" help requests</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mt-0.5">✓</div>
                  <div>
                    <h4 className="text-lg">Cost Savings</h4>
                    <p className="text-gray-600">Reduced need for physical signage and staff assistance</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#004080] to-[#4A90E2] text-white p-6 rounded-xl">
                <h3 className="text-xl mb-4">Measurable Impact</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-1">85%</div>
                    <div className="text-sm opacity-90">Faster Navigation</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">60%</div>
                    <div className="text-sm opacity-90">Fewer Support Calls</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">95%</div>
                    <div className="text-sm opacity-90">User Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">$50K</div>
                    <div className="text-sm opacity-90">Annual Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Call to Action
    {
      id: 9,
      title: "Next Steps",
      type: "content",
      content: (
        <div className="text-center space-y-12">
          <h2 className="text-4xl text-[#004080] mb-8">Ready to Transform Campus Navigation?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-xl text-[#004080] mb-3">Pilot Program</h3>
              <p className="text-gray-600">Start with one building to validate the system and gather user feedback</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-xl text-[#004080] mb-3">Campus Rollout</h3>
              <p className="text-gray-600">Expand to all buildings with QR codes and real-time integrations</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-xl text-[#004080] mb-3">Smart Features</h3>
              <p className="text-gray-600">Add AI-powered features and multi-campus support</p>
            </Card>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center space-x-6">
              <Button size="lg" className="bg-[#004080] hover:bg-[#003366] text-white px-8 py-4 text-lg">
                Schedule Demo
              </Button>
              <Button size="lg" variant="outline" className="border-[#4A90E2] text-[#4A90E2] hover:bg-[#E3F2FD] px-8 py-4 text-lg">
                View Live Prototype
              </Button>
            </div>
            
            <div className="text-gray-600">
              <p>Questions? Contact us at <span className="text-[#4A90E2]">demo@mapmycampus.edu</span></p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] rounded-xl p-8 mt-12">
            <h3 className="text-2xl text-[#004080] mb-4">Thank You</h3>
            <p className="text-gray-700 text-lg">MapMyCampus: Making Campus Navigation Intelligent</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Presentation Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#004080] rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🏛️</span>
          </div>
          <div>
            <h1 className="text-[#004080]">MapMyCampus Presentation</h1>
            <p className="text-sm text-gray-500">Campus Navigation System Demo</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-12 min-h-[600px] flex flex-col justify-center">
          {currentSlideData.content}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {/* Slide Dots */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[#004080]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}