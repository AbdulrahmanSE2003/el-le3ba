#!/usr/bin/env bash
#
# test-answer-race.sh — Fires two concurrent answer submissions for the same
# question/session and asserts only ONE succeeds (HTTP 200).
#
# Prerequisites:
#   - Backend running (npm run dev from backend/)
#   - A valid session in "running" status with unanswered questions
#   - A valid JWT for a team member of that session's team
#
# Usage:
#   SESSION_ID=abc JWT=xyz QUESTION_ID=def bash scripts/test-answer-race.sh
#
# The BASE_URL defaults to http://localhost:5000/api/v1; override with BASE_URL.

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:5000/api/v1}"

SESSION_ID="${SESSION_ID:?Must set SESSION_ID}"
JWT="${JWT:?Must set JWT}"
QUESTION_ID="${QUESTION_ID:?Must set QUESTION_ID}"

echo "=== Concurrent answer race test ==="
echo "Session:  $SESSION_ID"
echo "Question: $QUESTION_ID"
echo "Backend:  $BASE_URL"
echo ""

AUTH="Authorization: Bearer $JWT"
URL="$BASE_URL/sessions/$SESSION_ID/answer"
BODY=$(cat <<EOF
{
  "questionId": "$QUESTION_ID",
  "submittedAnswer": "test-answer",
  "timeTaken": 1000
}
EOF
)

do_request() {
  curl -s -o /tmp/answer-race-resp-$1.txt -w "%{http_code}" \
    -X POST "$URL" \
    -H "Content-Type: application/json" \
    -H "$AUTH" \
    -d "$BODY"
}

echo "Firing two concurrent requests…"

do_request 1 &
pid1=$!
do_request 2 &
pid2=$!

wait $pid1
code1=$?
wait $pid2
code2=$?

status1=$(cat /tmp/answer-race-resp-1.txt)
status2=$(cat /tmp/answer-race-resp-2.txt)

echo "Request 1 status: $status1"
echo "Request 2 status: $status2"

success_count=0
if [[ "$status1" == "200" ]]; then success_count=$((success_count + 1)); fi
if [[ "$status2" == "200" ]]; then success_count=$((success_count + 1)); fi

if [[ "$success_count" -eq 1 ]]; then
  echo ""
  echo "✅ PASS — Exactly one request succeeded (the other was rejected as expected)."
  exit 0
elif [[ "$success_count" -eq 2 ]]; then
  echo ""
  echo "❌ FAIL — Both requests succeeded! Race condition still present."
  exit 1
else
  echo ""
  echo "⚠️  Neither request returned 200. Check that your SESSION_ID / JWT / QUESTION_ID are valid."
  exit 2
fi
