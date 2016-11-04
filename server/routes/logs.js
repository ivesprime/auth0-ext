import { Router } from 'express';
import auth0 from '../lib/auth0';

export default () => {
  const api = Router();

  /*
   * List the most recent logs.
   */
  api.get('/', (req, res, next) => {
    auth0.getLogs({ sort: 'date:-1', per_page: 20, page: req.query.page || 0, fields: 'type,date,client_name,user_name,description,connection' }, req.sub)
      .then(logs => res.json(logs))
      .catch(next);
  });

  /*
   * List a single log record.
   */
  api.get('/:id', (req, res, next) => {
    auth0.getLog(req.params.id, req.sub)
      .then(log => res.json({ log }))
      .catch(next);
  });

  return api;
};
