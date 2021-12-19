const AmplifyConfigure = {
  dev: {
    aws_project_region: "ap-southeast-2",
    aws_appsync_graphqlEndpoint:
      "https://quy3wncmofe6tevyz2lb6ckvi4.appsync-api.ap-southeast-2.amazonaws.com/graphql",
    aws_appsync_region: "ap-southeast-2",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "da2-s3j3fq3brrceff4bthnoyiw3ri",
    aws_cognito_identity_pool_id:
      "ap-southeast-2:1dbc9880-ce94-4506-82da-48e6cff8ef61",
    aws_cognito_region: "ap-southeast-2",
    aws_user_pools_id: "ap-southeast-2_vleAOaU0F",
    aws_user_pools_web_client_id: "19fr7i7nltt6j5hi69juhb7osc",
    oauth: {},
    aws_cognito_username_attributes: [],
    aws_cognito_social_providers: [],
    aws_cognito_signup_attributes: ["EMAIL"],
    aws_cognito_mfa_configuration: "OFF",
    aws_cognito_mfa_types: ["SMS"],
    aws_cognito_password_protection_settings: {
      passwordPolicyMinLength: 8,
      passwordPolicyCharacters: [],
    },
    aws_cognito_verification_mechanisms: ["EMAIL"],
    aws_user_files_s3_bucket:
      "amplifytutorialoneeb71ffcb9e1e4ab09d46e7e344ec4133940-dev",
    aws_user_files_s3_bucket_region: "ap-southeast-2",
  },
  prod: {
    aws_project_region: "ap-southeast-2",
    aws_appsync_graphqlEndpoint:
      "https://l2czt2tmszayfakahn2raygw7m.appsync-api.ap-southeast-2.amazonaws.com/graphql",
    aws_appsync_region: "ap-southeast-2",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "da2-csauz7gim5asvoqdxikmbsoa74",
    aws_cognito_identity_pool_id:
      "ap-southeast-2:ab6afbff-b17d-4b16-96fb-4c913ff036e4",
    aws_cognito_region: "ap-southeast-2",
    aws_user_pools_id: "ap-southeast-2_omae8NRon",
    aws_user_pools_web_client_id: "2bidea9vi8njo1dc956pof8tl",
    oauth: {},
    aws_cognito_username_attributes: [],
    aws_cognito_social_providers: [],
    aws_cognito_signup_attributes: ["EMAIL"],
    aws_cognito_mfa_configuration: "OFF",
    aws_cognito_mfa_types: ["SMS"],
    aws_cognito_password_protection_settings: {
      passwordPolicyMinLength: 8,
      passwordPolicyCharacters: [],
    },
    aws_cognito_verification_mechanisms: ["EMAIL"],
    aws_user_files_s3_bucket:
      "amplifytutorialoneeb71ffcb9e1e4ab09d46e7e344ec4144225-prod",
    aws_user_files_s3_bucket_region: "ap-southeast-2",
  },
};

export default AmplifyConfigure;
