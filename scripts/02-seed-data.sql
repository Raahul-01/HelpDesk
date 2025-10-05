-- Insert sample users with different roles
INSERT INTO users (id, email, name, role) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@helpdesk.com', 'Admin User', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'agent1@helpdesk.com', 'Agent Smith', 'agent'),
  ('00000000-0000-0000-0000-000000000003', 'agent2@helpdesk.com', 'Agent Jones', 'agent'),
  ('00000000-0000-0000-0000-000000000004', 'user1@helpdesk.com', 'John Doe', 'user'),
  ('00000000-0000-0000-0000-000000000005', 'user2@helpdesk.com', 'Jane Smith', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert sample tickets with varying SLA deadlines
INSERT INTO tickets (id, title, description, status, priority, created_by, assigned_to, sla_deadline, is_breached) VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    'Login page not loading',
    'Users are reporting that the login page is not loading properly. Getting a blank screen.',
    'open',
    'urgent',
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000002',
    NOW() + INTERVAL '2 hours',
    FALSE
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Password reset email not received',
    'Requested password reset but did not receive the email after 30 minutes.',
    'in_progress',
    'high',
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000003',
    NOW() + INTERVAL '4 hours',
    FALSE
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'Feature request: Dark mode',
    'Would be great to have a dark mode option for the dashboard.',
    'open',
    'low',
    '00000000-0000-0000-0000-000000000004',
    NULL,
    NOW() + INTERVAL '7 days',
    FALSE
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Database connection timeout',
    'Getting frequent database connection timeouts during peak hours.',
    'resolved',
    'urgent',
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000002',
    NOW() - INTERVAL '1 hour',
    TRUE
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample comments
INSERT INTO comments (ticket_id, user_id, content) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'I am looking into this issue. Can you provide more details about your browser?'),
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004', 'I am using Chrome version 120 on Windows 11.'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'Checking the email logs now. Will update shortly.'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'Issue resolved by increasing connection pool size.');

-- Insert sample ticket history
INSERT INTO ticket_history (ticket_id, user_id, action, new_value) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004', 'created', 'Ticket created'),
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'assigned', 'Assigned to Agent Smith'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 'created', 'Ticket created'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'assigned', 'Assigned to Agent Jones'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'status_changed', 'Status changed to in_progress'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005', 'created', 'Ticket created'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'status_changed', 'Status changed to resolved');
