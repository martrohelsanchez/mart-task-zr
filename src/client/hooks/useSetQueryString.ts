import qs from 'qs';
import { useHistory } from 'react-router-dom';

import { Indexable } from 'src/commons/types';

export function useSetQueryString() {
  const history = useHistory();

  function setQueryString(data: Indexable) {
    history.push({
      pathname: location.pathname,
      search: qs.stringify(data),
    });
  }

  return setQueryString;
}
