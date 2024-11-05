import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ProcessingAgreement = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <img src='/images/new_logo.png' alt='c3Logo' style={{ width: '200px', marginBottom: '16px',marginLeft:'auto' }} />
        <Typography variant="h4" gutterBottom>
          Data Processing Agreement
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Purpose of Agreement
        </Typography>
        <Typography variant="body1" gutterBottom >
          This Data Processing Agreement (DPA) governs the processing of personal information by C3 Recruitment on behalf of applicants (Data Subjects) in compliance with the Protection of Personal Information Act (POPIA) of South Africa. It ensures that personal information is handled securely, transparently, and in alignment with POPIA requirements.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Roles and Responsibilities
        </Typography>
        <Typography variant="body1" gutterBottom >
          C3 Recruitment acts as the Data Processor, processing personal information on behalf of the applicants who are the Data Subjects. We commit to processing personal information solely for recruitment purposes as outlined in our POPIA Disclaimer.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Obligations of C3 Recruitment
        </Typography>
        <Typography variant="body1" gutterBottom >
          C3 Recruitment agrees to:
        </Typography>
        <Typography variant="body1" gutterBottom >
          - Process personal information solely in accordance with documented instructions provided by the applicant.
        </Typography>
        <Typography variant="body1" gutterBottom >
          - Ensure that anyone authorized to process personal data is subject to a duty of confidentiality.
        </Typography>
        <Typography variant="body1" gutterBottom >
          - Implement and maintain appropriate technical and organizational measures to safeguard personal information.
        </Typography>
        <Typography variant="body1" gutterBottom >
          - Notify applicants promptly of any data breach involving their personal information that could impact their rights.
        </Typography>
        <Typography variant="body1" gutterBottom >
          - Provide assistance to applicants to uphold their rights as specified under POPIA.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Data Subject Rights and Processor Assistance
        </Typography>
        <Typography variant="body1" gutterBottom >
          In compliance with POPIA, C3 Recruitment acknowledges and facilitates the following rights for Data Subjects:
        </Typography>
        <Typography variant="body1" gutterBottom >
          - Access, rectification, deletion, and restriction of personal data, subject to legal obligations.
        </Typography>
        <Typography variant="body1" gutterBottom >
          - Assistance with exercising these rights by contacting recruitment@convergenc3.com.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Data Retention and Deletion
        </Typography>
        <Typography variant="body1" gutterBottom >
          Personal information is retained only as long as necessary for recruitment, regulatory compliance, or for a maximum of five years post-deregistration. Upon request or end of the retention period, data will be securely deleted or anonymized.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Security Measures
        </Typography>
        <Typography variant="body1" gutterBottom >
          Industry-standard security measures, including access control and secure database management, protect personal information from unauthorized access, disclosure, alteration, or destruction.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Sub-Processors
        </Typography>
        <Typography variant="body1" gutterBottom >
          C3 Recruitment may engage third-party service providers to assist in processing personal information, restricted to providers who comply with equivalent data protection standards.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Limitation of Liability
        </Typography>
        <Typography variant="body1" gutterBottom >
          C3 Recruitment’s liability for any data breach or unauthorized disclosure is limited to the extent permissible by law. We commit to rectifying issues promptly to minimize any potential impact on applicants.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Governing Law
        </Typography>
        <Typography variant="body1" gutterBottom >
          This agreement is governed by the laws of South Africa, specifically POPIA.
        </Typography>

        <Typography variant="body1" gutterBottom>
          C3 Recruitment
        </Typography>
      </Box>
    </Container>
  );
};

export default ProcessingAgreement;
