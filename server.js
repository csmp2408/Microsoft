/**
 * Interview Intelligence Platform - Main Server Entry Point
 * 
 * AI-powered Interview Intelligence Platform MVP
 * Built for Microsoft Hackathon
 * 
 * Core Philosophy:
 * - Human stays in control
 * - AI supports with analysis, justification, and suggestions
 * - Every evaluation is explainable and evidence-based
 * 
 * Architecture:
 * - Express.js REST API
 * - In-memory storage (easily swappable with real DB)
 * - Modular AI analysis engine (ready for LLM integration)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const interviewRoutes = require('./routes/interviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Enable CORS for frontend integration
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// Parse JSON request bodies
app.use(express.json());

// Request logging middleware (helpful for demo/debugging)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Interview Intelligence Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Interview Intelligence Platform API',
    version: '1.0.0',
    description: 'AI-powered interview analysis and scoring system',
    endpoints: {
      'POST /interview/start': 'Create and start a new interview session',
      'POST /interview/question': 'Record a question asked by the interviewer',
      'POST /interview/response': 'Record candidate response and get AI analysis',
      'POST /interview/stop/:sessionId': 'End an interview session',
      'GET /interview/analysis/:sessionId': 'Get all analysis data for a session',
      'GET /interview/summary/:sessionId': 'Generate comprehensive interview summary',
      'GET /interview/session/:sessionId': 'Get session details',
      'GET /interview/sessions': 'List all interview sessions'
    },
    philosophy: {
      humanControl: 'Human interviewer stays in control at all times',
      aiSupport: 'AI provides analysis, justification, and suggestions',
      explainable: 'Every evaluation is evidence-based and explainable'
    }
  });
});

// Mount interview routes
app.use('/interview', interviewRoutes);

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    hint: 'GET /api for available endpoints'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

app.listen(PORT, () => {
  console.log('');
  console.log('===========================================');
  console.log('  Interview Intelligence Platform');
  console.log('  AI-Powered Interview Analysis System');
  console.log('===========================================');
  console.log('');
  console.log(`  Server running on: http://localhost:${PORT}`);
  console.log(`  Frontend:          http://localhost:${PORT}`);
  console.log(`  API docs:          http://localhost:${PORT}/api`);
  console.log(`  Health check:      http://localhost:${PORT}/health`);
  console.log('');
  console.log('  Core Endpoints:');
  console.log('    POST /interview/start      - Start new interview');
  console.log('    POST /interview/question   - Record question');
  console.log('    POST /interview/response   - Record & analyze response');
  console.log('    GET  /interview/summary/:id - Get interview summary');
  console.log('');
  console.log('  Philosophy: Human in control, AI supports');
  console.log('===========================================');
  console.log('');
});

module.exports = app; // Export for testing
