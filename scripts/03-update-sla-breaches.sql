-- This script can be run periodically to update SLA breach status
-- In production, this would be automated via a cron job or scheduled task

UPDATE tickets
SET is_breached = TRUE
WHERE status IN ('open', 'in_progress')
  AND sla_deadline < NOW()
  AND is_breached = FALSE;

-- Log SLA breaches in history
INSERT INTO ticket_history (ticket_id, user_id, action, new_value)
SELECT 
  id,
  '00000000-0000-0000-0000-000000000001', -- System user (admin)
  'sla_breached',
  'SLA deadline exceeded'
FROM tickets
WHERE status IN ('open', 'in_progress')
  AND sla_deadline < NOW()
  AND is_breached = TRUE
  AND NOT EXISTS (
    SELECT 1 FROM ticket_history 
    WHERE ticket_history.ticket_id = tickets.id 
    AND ticket_history.action = 'sla_breached'
  );
