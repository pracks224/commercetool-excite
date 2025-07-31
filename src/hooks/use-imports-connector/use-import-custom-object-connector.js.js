import { useMcMutation } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import ImportCustomObjectMutation from './import-custom-object.ctp.graphql';
import { extractErrorFromGraphQlResponse } from '../../helpers';

export const useImportCustomObject = () => {
  const [importCustomObjectMutation, { loading }] = useMcMutation(
    ImportCustomObjectMutation
  );

  const execute = async ({ container, key, value }) => {
    try {
      const response = await importCustomObjectMutation({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          container,
          key,
          value,
        },
      });
      return response;
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    execute,
    loading,
  };
};
