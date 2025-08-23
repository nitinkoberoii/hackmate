import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MemberManagement = ({ team, currentUser, onUpdateMember, onRemoveMember }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const roles = [
    { value: 'leader', label: 'Team Leader', icon: 'Crown' },
    { value: 'developer', label: 'Developer', icon: 'Code' },
    { value: 'designer', label: 'Designer', icon: 'Palette' },
    { value: 'member', label: 'Member', icon: 'User' }
  ];

  const getRoleIcon = (role) => {
    const roleData = roles?.find(r => r?.value === role);
    return roleData ? roleData?.icon : 'User';
  };

  const getRoleColor = (role) => {
    const colors = {
      leader: 'text-warning',
      developer: 'text-primary',
      designer: 'text-purple-500',
      member: 'text-muted-foreground'
    };
    return colors?.[role] || 'text-muted-foreground';
  };

  const isTeamLeader = currentUser?.role === 'leader';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Team Members Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">Team Members</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            {team?.members?.length} of {team?.maxMembers} members
          </p>
        </div>
        {isTeamLeader && team?.members?.length < team?.maxMembers && (
          <Button
            variant="default"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => setShowInviteModal(true)}
            className="w-full sm:w-auto"
          >
            Invite Member
          </Button>
        )}
      </div>
      
      {/* Members List */}
      <div className="grid gap-3 md:gap-4">
        {team?.members?.map((member) => (
          <div key={member?.id} className="bg-card border border-border rounded-lg p-3 md:p-4">
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="relative flex-shrink-0">
                <Image
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                {member?.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-success border-2 border-card rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                  <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                    {member?.name}
                  </h4>
                  <div className={`flex items-center space-x-1 ${getRoleColor(member?.role)}`}>
                    <Icon name={getRoleIcon(member?.role)} size={12} className="md:w-3.5 md:h-3.5" />
                    <span className="text-xs font-medium capitalize">{member?.role}</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground mb-2">{member?.email}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                  {member?.skills?.slice(0, 3)?.map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 md:px-2 md:py-1 bg-muted text-muted-foreground text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {member?.skills?.length > 3 && (
                    <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      +{member?.skills?.length - 3} more
                    </span>
                  )}
                </div>

                {/* Member Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="GitCommit" size={10} className="md:w-3 md:h-3" />
                    <span>{member?.commits || 0} commits</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={10} className="md:w-3 md:h-3" />
                    <span>Joined {new Date(member.joinedAt)?.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isTeamLeader && member?.id !== currentUser?.id && (
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Settings"
                    onClick={() => setSelectedMember(member)}
                    className="text-xs"
                  >
                    Manage
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pending Invitations */}
      {team?.pendingInvitations && team?.pendingInvitations?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h4 className="text-sm md:text-base font-semibold text-foreground mb-3 md:mb-4">Pending Invitations</h4>
          <div className="space-y-2.5 md:space-y-3">
            {team?.pendingInvitations?.map((invitation) => (
              <div key={invitation?.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 md:p-3 bg-muted rounded-lg space-y-2 sm:space-y-0">
                <div>
                  <p className="text-xs md:text-sm font-medium text-foreground">{invitation?.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Invited {new Date(invitation.sentAt)?.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-warning">Pending</span>
                  {isTeamLeader && (
                    <Button variant="ghost" size="sm" iconName="X" className="text-xs">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Member Management Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 md:p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-foreground">Manage Member</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setSelectedMember(null)}
              />
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2.5 md:space-x-3">
                <Image
                  src={selectedMember?.avatar}
                  alt={selectedMember?.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm md:text-base font-medium text-foreground">{selectedMember?.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{selectedMember?.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Role</label>
                <select className="w-full px-2.5 md:px-3 py-1.5 md:py-2 bg-input border border-border rounded-lg text-foreground text-sm">
                  {roles?.map((role) => (
                    <option key={role?.value} value={role?.value} selected={role?.value === selectedMember?.role}>
                      {role?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 md:pt-4">
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    // Handle role update
                    setSelectedMember(null);
                  }}
                >
                  Update Role
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    // Handle member removal
                    setSelectedMember(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 md:p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-foreground">Invite Team Member</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowInviteModal(false)}
              />
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-2.5 md:px-3 py-1.5 md:py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Role</label>
                <select className="w-full px-2.5 md:px-3 py-1.5 md:py-2 bg-input border border-border rounded-lg text-foreground text-sm">
                  {roles?.filter(role => role?.value !== 'leader')?.map((role) => (
                    <option key={role?.value} value={role?.value}>
                      {role?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Message (Optional)</label>
                <textarea
                  placeholder="Add a personal message..."
                  rows={3}
                  className="w-full px-2.5 md:px-3 py-1.5 md:py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 md:pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setShowInviteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    // Handle invitation
                    setShowInviteModal(false);
                  }}
                >
                  Send Invite
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;