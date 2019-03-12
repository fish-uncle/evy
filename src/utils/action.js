export const createAction = (type, namespace) => (payload, callback) => {
  let _type = `${namespace}/${type}`;
  return {
    type: _type,
    payload,
    callback
  };
};

export const createModelActions = (config) => {
  let Actions = {};
  if (!config) throw new Error('没有配置');

  if (config.reducers !== undefined) {
    Object.keys(config.reducers).forEach((key) => {
      Actions[key] = createAction(key, config.namespace);
    });
  }

  if (config.effects !== undefined) {
    Object.keys(config.effects).forEach((key) => {
      Actions[key] = createAction(key, config.namespace);
    });
  }
  return Actions;
};
