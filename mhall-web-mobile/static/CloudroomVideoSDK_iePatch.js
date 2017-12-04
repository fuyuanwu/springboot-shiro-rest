function crMgrObj::loginSuccess()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_LoginSuccess}, Array.prototype.slice.call(arguments));
}
function crMgrObj::loginFail()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_LoginFail}, Array.prototype.slice.call(arguments));
}

function crMgrObj::lineOff()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_LineOff}, Array.prototype.slice.call(arguments));
}

function crMgrObj::setDNDStatusSuccess()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_SetDNDStatusSuccess}, Array.prototype.slice.call(arguments));
}
function crMgrObj::setDNDStatusFail()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_SetDNDStatusFail}, Array.prototype.slice.call(arguments));
}

function crMgrObj::createMeetingSuccess()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_CreateMeetingSuccess}, Array.prototype.slice.call(arguments));
}
function crMgrObj::createMeetingFail()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_CreateMeetingFail}, Array.prototype.slice.call(arguments));
}
function crMgrObj::getMeetingsSuccess()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_GetMeetingsSuccess}, Array.prototype.slice.call(arguments));
}
function crMgrObj::getMeetingsFail()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_GetMeetingsFail}, Array.prototype.slice.call(arguments));
}
function crMgrObj::callSuccess()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_CallSuccess}, Array.prototype.slice.call(arguments));
}
function crMgrObj::callFail()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_CallFail}, Array.prototype.slice.call(arguments));
}
function crMgrObj::acceptCallSuccess()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_AcceptCallSuccess}, Array.prototype.slice.call(arguments));
}
function crMgrObj::acceptCallFail()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_AcceptCallFail}, Array.prototype.slice.call(arguments));
}
function crMgrObj::rejectCallSuccess()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_RejectCallSuccess}, Array.prototype.slice.call(arguments));
}
function crMgrObj::rejectCallFail()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_RejectCallFail}, Array.prototype.slice.call(arguments));
}
function crMgrObj::hangupCallSuccess()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_HangupCallSuccess}, Array.prototype.slice.call(arguments));
}
function crMgrObj::hangupCallFail()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_HangupCallFail}, Array.prototype.slice.call(arguments));
}
function crMgrObj::notifyCallIn()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCallIn}, Array.prototype.slice.call(arguments));
}
function crMgrObj::notifyCallAccepted()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCallAccepted}, Array.prototype.slice.call(arguments));
}
function crMgrObj::notifyCallRejected()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCallRejected}, Array.prototype.slice.call(arguments));
}
function crMgrObj::notifyCallHungup()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCallHungup}, Array.prototype.slice.call(arguments));
}
function crMgrObj::sendCmdRlst()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_SendCmdRlst}, Array.prototype.slice.call(arguments));
}
function crMgrObj::sendBufferRlst()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_SendBufferRlst}, Array.prototype.slice.call(arguments));
}
function crMgrObj::sendFileRlst()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_SendFileRlst}, Array.prototype.slice.call(arguments));
}
function crMgrObj::sendProgress()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_SendProgress}, Array.prototype.slice.call(arguments));
}
function crMgrObj::cancelSendRlst()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_CancelSendRlst}, Array.prototype.slice.call(arguments));
}
function crMgrObj::notifyCmdData()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCmdData}, Array.prototype.slice.call(arguments));
}
function crMgrObj::notifyBufferData()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyBufferData}, Array.prototype.slice.call(arguments));
}
function crMgrObj::notifyFileData()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyFileData}, Array.prototype.slice.call(arguments));
}
function crMgrObj::notifyCancelSend()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCancelSend}, Array.prototype.slice.call(arguments));
}






function crMeetObj::enterMeetingRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_EnterMeetingRslt}, Array.prototype.slice.call(arguments));
}
function crMeetObj::userEnterMeeting()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_UserEnterMeeting}, Array.prototype.slice.call(arguments));
}
function crMeetObj::userLeftMeeting()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_UserLeftMeeting}, Array.prototype.slice.call(arguments));
}
function crMeetObj::endMeetingRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_EndMeetingRslt}, Array.prototype.slice.call(arguments));
}
function crMeetObj::meetingStopped()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_MeetingStopped}, Array.prototype.slice.call(arguments));
}
function crMeetObj::meetingDropped()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_MeetingDropped}, Array.prototype.slice.call(arguments));
}
function crMeetObj::netStateChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NetStateChanged}, Array.prototype.slice.call(arguments));
}
function crMeetObj::audioDevChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_AudioDevChanged}, Array.prototype.slice.call(arguments));
}
function crMeetObj::audioStatusChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_AudioStatusChanged}, Array.prototype.slice.call(arguments));
}
function crMeetObj::micEnergyUpdate()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_MicEnergyUpdate}, Array.prototype.slice.call(arguments));
}
function crMeetObj::videoStatusChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_VideoStatusChanged}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyVideoData()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyVideoData}, Array.prototype.slice.call(arguments));
}
function crMeetObj::videoDevChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_VideoDevChanged}, Array.prototype.slice.call(arguments));
}function crMeetObj::defVideoChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_DefVideoChanged}, Array.prototype.slice.call(arguments));
}
function crMeetObj::recordErr()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_RecordErr}, Array.prototype.slice.call(arguments));
}
function crMeetObj::recordStateChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_RecordStateChanged}, Array.prototype.slice.call(arguments));
}
function crMeetObj::uploadRecordFileErr()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_UploadRecordFileErr}, Array.prototype.slice.call(arguments));
}
function crMeetObj::cancelUploadRecordFileErr()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_CancelUploadRecordFileErr}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyRecordFileStateChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyRecordFileStateChanged}, Array.prototype.slice.call(arguments));
}function crMeetObj::notifyRecordFileUploadProgress()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyRecordFileUploadProgress}, Array.prototype.slice.call(arguments));
}
function crMeetObj::startScreenShareRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_StartScreenShareRslt}, Array.prototype.slice.call(arguments));
}
function crMeetObj::stopScreenShareRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_StopScreenShareRslt}, Array.prototype.slice.call(arguments));
}function crMeetObj::notifyScreenShareStarted()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyScreenShareStarted}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyScreenShareStopped()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyScreenShareStopped}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyScreenShareData()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyScreenShareData}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyCatchScreen()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCatchScreen}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyGiveCtrlRight()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyGiveCtrlRight}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyReleaseCtrlRight()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyReleaseCtrlRight}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyShareRectChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyShareRectChanged}, Array.prototype.slice.call(arguments));
}
function crMeetObj::sendIMmsgRlst()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_SendIMmsgRlst}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyIMmsg()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyIMmsg}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifySwitchToPage()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifySwitchToPage}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyVideoWallMode()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyVideoWallMode}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyMainVideo()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyMainVideo}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyInitBoards()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyInitBoards}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyInitBoardElements()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyInitBoardElements}, Array.prototype.slice.call(arguments));
}function crMeetObj::notifyCreateBoard()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCreateBoard}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyCloseBoard()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyCloseBoard}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyBoardBkImage()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyBoardBkImage}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyAddBoardElement()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyAddBoardElement}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyDelBoardElement()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyDelBoardElement}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyMouseHotSpot()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyMouseHotSpot}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyNetDiskFileDeleteRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyNetDiskFileDeleteRslt}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyNetDiskTransforProgress()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyNetDiskTransforProgress}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyMediaOpened()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyMediaOpened}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyMediaStart()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyMediaStart}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyMediaStop()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyMediaStop}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyMediaPause()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyMediaPause}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyPlayPosSetted()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyPlayPosSetted}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyMemberMediaData()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyMemberMediaData}, Array.prototype.slice.call(arguments));
}
function crMeetObj::clientInviteRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_ClientInviteRslt}, Array.prototype.slice.call(arguments));
}
function crMeetObj::clientCancelInviteRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_ClientCancelInviteRslt}, Array.prototype.slice.call(arguments));
}
function crMeetObj::notifyInviteStatus()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_NotifyInviteStatus}, Array.prototype.slice.call(arguments));
}


function crQueueObj::initQueueDatRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_InitQueueDatRslt}, Array.prototype.slice.call(arguments));
}
function crQueueObj::queueStatusChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_QueueStatusChanged}, Array.prototype.slice.call(arguments));
}
function crQueueObj::queuingInfoChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_QueuingInfoChanged}, Array.prototype.slice.call(arguments));
}
function crQueueObj::startQueuingRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_StartQueuingRslt}, Array.prototype.slice.call(arguments));
}
function crQueueObj::stopQueuingRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_StopQueuingRslt}, Array.prototype.slice.call(arguments));
}
function crQueueObj::startServiceRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_StartServiceRslt}, Array.prototype.slice.call(arguments));
}
function crQueueObj::stopServiceRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_StopServiceRslt}, Array.prototype.slice.call(arguments));
}
function crQueueObj::responseAssignUserRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_ResponseAssignUserRslt}, Array.prototype.slice.call(arguments));
}
function crQueueObj::autoAssignUser()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_AutoAssignUser}, Array.prototype.slice.call(arguments));
}
function crQueueObj::reqAssignUserRslt()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_ReqAssignUserRslt}, Array.prototype.slice.call(arguments));
}
function crQueueObj::cancelAssignUser()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_CancelAssignUser}, Array.prototype.slice.call(arguments));
}

function crHttpObj::fileStateChanged()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_FileStateChanged}, Array.prototype.slice.call(arguments));
}

function crHttpObj::fileHttpRspHeader()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_FileHttpRspHeader}, Array.prototype.slice.call(arguments));
}
function crHttpObj::fileHttpRspContent()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_FileHttpRspContent}, Array.prototype.slice.call(arguments));
}

function crHttpObj::fileProgress()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_FileProgress}, Array.prototype.slice.call(arguments));
}

function crHttpObj::fileFinished()
{
  __crVideo_CallBack.apply({"proxy":CRVideo_FileFinished}, Array.prototype.slice.call(arguments));
}

