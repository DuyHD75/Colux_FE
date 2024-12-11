import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import textConfigs from '../config/text.config'
import { FaChevronRight } from "react-icons/fa6";

const PrivacyPolicy = () => {
    return (
        <Box p={{ xs: '65px 10px 16px 10px', md: '165px 121.96px 16px 121.96px' }} bgcolor='#0000' minHeight='inherit'>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mb: '2rem' }}>
                <Typography id="section" sx={{ scrollMarginTop: '96px', ...textConfigs.style.headerText, fontWeight: 'bold', textAlign: 'center' }} variant='h2'>Privacy Policy</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '16px', mt: '5px', textAlign: 'center' }}>Last Updated May 23rd, 2024</Typography>
            </Box>

            <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={4}>
                <Box width={{ xs: '100%', sm: '75%' }}>
                    <Typography id="section1" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem' }}>Information Covered by this Privacy Policy</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        This Privacy Policy explains the types of information that Kolux and its affiliated companies collect about you; how we use, share, and protect this information; and the choices you can make about how we use and share this information. This Privacy Policy governs information collected by Kolux or its Affiliates (as hereinafter defined), by any means, including, but not limited to, websites, mobile applications, and other online services that refer or link to this Privacy Policy, as well as information collected by other business functions of Kolux, such as through our stores, customer loyalty programs or when you speak with a customer service representative (collectively, the “Services”).
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        It is important that you read this Privacy Policy carefully because anytime you use our Services you consent to the practices we describe in this Privacy Policy. Key jurisdiction-specific information about our privacy practices is available in our policy here. In the event of any inconsistencies between the English-language version of this Privacy Policy and any local language version that we make available, the English-language version will prevail.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        As permissible by law, Kolux reserves the right to make changes to this Privacy Policy. If changes are made, updates will be reflected by the Last Updated date at the top of this Privacy Policy. These changes will take effect immediately upon posting. By continuing to use the Services following such changes, you will be deemed to have agreed to such changes.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '1rem' }}>
                        Our Services may link to third-party websites and services that are outside our control. In addition, we may have relationships with non-Kolux entities that distribute Kolux products. We are not responsible for the security or privacy of any information collected by such third parties. You should exercise caution, and review the privacy statements applicable to such third parties.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                        <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                        >
                            Back to top
                            <span
                                style={{
                                    display: 'inline-block',
                                    transition: 'transform 0.3s ease-in-out',
                                    marginLeft: '5px',
                                }}
                            >
                                <FaChevronRight />
                            </span>
                        </a>
                    </Typography>
                    <Divider />
                    <Typography id="section2" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Information We Collect, and How We Collect It</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        We may collect information about you in a variety of ways:
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        You may provide us with information directly.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        We may collect information about you when you use our Services, make purchases, or view our online advertisements.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        We may collect additional information about you in accordance with applicable law.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '1rem' }}>
                        The manner of our collection, the type of information collected, and the processing of such information may vary by jurisdiction to accommodate local legal requirements.
                    </Typography>

                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                        <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                        >
                            Back to top
                            <span
                                style={{
                                    display: 'inline-block',
                                    transition: 'transform 0.3s ease-in-out',
                                    marginLeft: '5px',
                                }}
                            >
                                <FaChevronRight />
                            </span>
                        </a>
                    </Typography>
                    <Divider />
                    <Typography id="section3" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Affiliates, Service Providers, and Other Parties</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Affiliates. We share information within Kolux and with our affiliated companies, which include businesses under common control (collectively referred to as our “Affiliates”). This sharing may occur to improve our products and services for you.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Service Providers. We engage third-party service providers to perform various contractual services on our behalf, which may require sharing your information. For example, these providers might help fulfill your product and service requests, process payments, respond to your inquiries, send emails on our behalf, and analyze data to enhance our offerings.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Other Parties When Required by Law or for Service Protection. There are situations where we may need to disclose your information to other parties:
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem', ml: '1rem' }}>
                        - To comply with legal requirements or respond to a government request.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem', ml: '1rem' }}>
                        - To prevent fraud or ensure adherence to the policies governing our services.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem', ml: '1rem' }}>
                        - When legally permissible, to protect the rights, property, or safety of Kolux, our affiliates, business partners, customers, or employees.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem', ml: '1rem' }}>
                        - To fulfill corporate governance responsibilities, such as conducting audits.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Other Parties in Connection with Corporate Transactions. In the event of a sale or transfer of all or part of our business or assets, such as during a merger or bankruptcy reorganization or liquidation, we may disclose your information to a third party.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Other Parties with Your Consent or at Your Request. Besides the disclosures mentioned in this Privacy Policy, we may share your information with third parties if you give your consent or request it.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '1rem' }}>
                        Aggregated and Non-Personal Information. We may also share information in a way that doesn’t identify you personally (for instance, aggregated data) for general business purposes, such as reporting the number of visitors to our websites or services.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                        <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                        >
                            Back to top
                            <span
                                style={{
                                    display: 'inline-block',
                                    transition: 'transform 0.3s ease-in-out',
                                    marginLeft: '5px',
                                }}
                            >
                                <FaChevronRight />
                            </span>
                        </a>
                    </Typography>
                    <Divider />
                    <Typography id="section4" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>International Transfer of Data</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Kolux and its service providers may collect, transfer, store and process your personal information outside of your country of residence, including to the United States. Please note that other countries’ data protection and other laws may not be as comprehensive as those in your country. In accordance with applicable law, we implement measures such as standard data protection clauses to ensure that any transferred personal information remains protected and secure. You may obtain further information about these measures by contacting us using the Global Privacy Portal.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                        <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                        >
                            Back to top
                            <span
                                style={{
                                    display: 'inline-block',
                                    transition: 'transform 0.3s ease-in-out',
                                    marginLeft: '5px',
                                }}
                            >
                                <FaChevronRight />
                            </span>
                        </a>
                    </Typography>
                    <Divider />
                    <Typography id="section5" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Third Parties That Provide Content or Functionality on Our Services</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Some of the content and functionality on our Services is provided by third parties that are not affiliated with us. For example, we enable you to share certain materials on our Services through social networking services, such as Facebook and Twitter. These and other social networking services may automatically collect information from or about your use of our Services when you use our Services while logged into the social networking services. We also offer online chat features that are supported by vendors - when you use these features, you are sharing information you provide in the chat with the vendor as well as with us. Third-party advertisers, including but not limited to session replay vendors and social media services, also may have a presence on some of our Services. These and other third parties collect or receive certain information about your use of our Services, including through the use of Cookies, pixels, and similar technologies, and this information may be collected over time and combined with information collected across different websites and online services.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Some of these companies participate in industry-developed programs designed to provide consumers choices about whether to receive targeted advertising. Please visit the websites operated by the Network Advertising Initiative and Digital Advertising Alliance to learn more. (Canadian users may also visit the website operated by the Digital Advertising Alliance of Canada. Further information in local languages may be available at that site.)
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '1rem' }}>
                        Our Services, including our websites, use analytics technology provided by Google Analytics to understand how users interact with the sites, improve our web experience, and better market our products. You may exercise choices regarding the use of Cookies from Google Analytics by going to <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a> or downloading the Google Analytics Opt-out Browser Add-on.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                        <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                        >
                            Back to top
                            <span
                                style={{
                                    display: 'inline-block',
                                    transition: 'transform 0.3s ease-in-out',
                                    marginLeft: '5px',
                                }}
                            >
                                <FaChevronRight />
                            </span>
                        </a>
                    </Typography>
                    <Divider />
                    <Typography id="section6" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Your Choices & Rights in Your Information</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        You have the right to access the personal information we hold about you. Upon request, we will provide you with a copy of this data in a structured, commonly used, and machine-readable format. This right allows you to understand what data we have collected about you and verify its accuracy.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        If any of the personal information we hold about you is inaccurate or incomplete, you have the right to request that we correct or update it. We encourage you to keep your information current to ensure the accuracy of the data we process.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        You have the right to request the deletion of your personal information under certain circumstances, such as when the data is no longer necessary for the purposes for which it was collected, or if you withdraw your consent (where applicable). We will comply with your request unless we are required to retain the information for legal or regulatory reasons.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        You may object to the processing of your personal information when it is based on our legitimate interests, including profiling. If you object, we will cease processing your data unless we can demonstrate compelling legitimate grounds for the processing that override your interests, rights, and freedoms, or for the establishment, exercise, or defense of legal claims.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        In certain situations, you have the right to request that we restrict the processing of your personal information. This means that we will continue to store your data but will not process it further. You can request restriction if you contest the accuracy of your data, if the processing is unlawful, or if you need the data for legal claims but do not want us to delete it.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Where applicable, you have the right to request that we transfer your personal data to another organization or directly to you. This right applies to data that you have provided to us and that is processed by automated means based on your consent or in the performance of a contract.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        If our processing of your personal information is based on your consent, you have the right to withdraw that consent at any time. Withdrawing consent does not affect the lawfulness of processing that occurred based on consent before its withdrawal. However, it may affect our ability to provide certain services to you.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        You have the right to opt out of receiving promotional communications from us. You can exercise this right by clicking the "unsubscribe" link in the emails we send or by contacting us directly. Please note that you may still receive administrative communications even after opting out of marketing messages.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        If you believe that your rights regarding your personal information have been violated, you have the right to lodge a complaint with a supervisory authority, particularly in the country or state where you live, work, or where the alleged infringement occurred.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        To exercise any of the rights mentioned above, please contact us at [Insert Contact Information]. We may ask you to verify your identity before fulfilling your request to ensure the security of your information.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '1rem' }}>
                        We aim to respond to all legitimate requests within one month. If your request is particularly complex, or if you have made multiple requests, it may take us longer. In such cases, we will notify you and keep you updated.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                        <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                        >
                            Back to top
                            <span
                                style={{
                                    display: 'inline-block',
                                    transition: 'transform 0.3s ease-in-out',
                                    marginLeft: '5px',
                                }}
                            >
                                <FaChevronRight />
                            </span>
                        </a>
                    </Typography>
                    <Divider />
                    <Typography id="section7" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>How to Contact Us</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        If you have questions about this Privacy Policy or our privacy practices, please contact Kolux through our Global Privacy Portal or at the following address:
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        The Kolux Company
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        Viet Nam
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                        01 Vo Qui Huan.
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '1rem' }}>
                        Danang City, 550000
                    </Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                        <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                        >
                            Back to top
                            <span
                                style={{
                                    display: 'inline-block',
                                    transition: 'transform 0.3s ease-in-out',
                                    marginLeft: '5px',
                                }}
                            >
                                <FaChevronRight />
                            </span>
                        </a>
                    </Typography>
                </Box>
                <Box width={{ xs: '100%', sm: '25%' }} sx={{ position: { xs: 'normal', sm: 'sticky' }, top: '96px', alignSelf: 'flex-start', maxWidth: '300px' }}>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '20px', mb: '0.5rem' }}> Table of Contents</Typography>
                    <Box sx={{ paddingLeft: '10px', paddingBottom: '1rem' }}>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px' }}>1. <a href='#section1' style={{ textDecoration: 'underline' }}> Information Covered by this Privacy Policy</a></Typography>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px' }}>2. <a href='#section2' style={{ textDecoration: 'underline' }}> Information We Collect</a></Typography>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px' }}>3. <a href='#section3' style={{ textDecoration: 'underline' }}> Sharing of Information</a></Typography>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px' }}>4. <a href='#section4' style={{ textDecoration: 'underline' }}> International Transfer of Data</a></Typography>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px' }}>5. <a href='#section5' style={{ textDecoration: 'underline' }}> Third Parties That Provide Content or Functionality on Our Services</a></Typography>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px' }}>6. <a href='#section6' style={{ textDecoration: 'underline' }}> Your Choices & Rights in Your Information</a></Typography>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px' }}>7. <a href='#section7' style={{ textDecoration: 'underline' }}> How to Contact Us</a></Typography>
                    </Box>
                    <Divider />
                </Box>
            </Stack>
        </Box >
    )
}

export default PrivacyPolicy