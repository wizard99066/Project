import React, { useEffect } from 'react'

import { Form } from 'antd'
import HCaptcha from '@hcaptcha/react-hcaptcha'

const Captcha = ({ className, onVerify }) => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development')
            onVerify()
    }, [])

    return (
        <Form.Item className={className}>
            <HCaptcha
                sitekey="c3fee414-96cf-4698-b7a0-50f4db3066e4"
                onVerify={onVerify}
            />
        </Form.Item>
    )
}

export default Captcha