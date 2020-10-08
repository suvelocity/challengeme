import React from "react";

function Submission({name, status, submittedAt}) {
	return (
		<tr>
            <td>
                {name}
            </td>
            <td>
                {status}
            </td>
            <td>
                {submittedAt}
            </td>
		</tr>
	);
}

export default Submission;
